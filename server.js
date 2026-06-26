/* global process */
import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON payloads
  app.use(express.json());

  // API Route: Commit changes to GitHub using user's access token
  app.post("/api/commit-to-github", async (req, res) => {
    const { token, owner = "jacksonmongbam123", repo = "st-antony", branch = "main", message = "feat: update to claymorphism style" } = req.body;

    if (!token) {
      return res.status(400).json({ error: "GitHub Personal Access Token is required." });
    }

    try {
      const authHeader = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "StAntony-Claymorphism-Sync"
      };

      // 1. Get branch info to get latest commit SHA
      console.log(`Fetching branch info for ref: refs/heads/${branch}`);
      let branchRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/branches/${branch}`, {
        headers: authHeader
      });

      let actualBranch = branch;

      if (!branchRes.ok) {
        // If default branch is not main, try master
        if (branch === "main") {
          console.log("Branch 'main' not found, trying 'master'...");
          branchRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/branches/master`, {
            headers: authHeader
          });
          if (branchRes.ok) {
            actualBranch = "master";
          }
        }
      }

      if (!branchRes.ok) {
        const errText = await branchRes.text();
        return res.status(branchRes.status).json({ error: `Failed to find branch '${branch}'. Ensure the repository exists and your token has permission. Details: ${errText}` });
      }

      const branchData = await branchRes.json();
      const latestCommitSha = branchData.commit.sha;
      const baseTreeSha = branchData.commit.commit.tree.sha;

      // 2. Read local files
      const dataJsPath = path.join(process.cwd(), "src", "data.js");
      const componentsJsxPath = path.join(process.cwd(), "src", "components.jsx");

      if (!fs.existsSync(dataJsPath) || !fs.existsSync(componentsJsxPath)) {
        return res.status(500).json({ error: "Local files 'src/data.js' or 'src/components.jsx' not found on the server." });
      }

      const dataJsContent = fs.readFileSync(dataJsPath, "utf-8");
      const componentsJsxContent = fs.readFileSync(componentsJsxPath, "utf-8");

      // 3. Create blob for data.js
      console.log("Creating blob for src/data.js...");
      const dataBlobRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs`, {
        method: "POST",
        headers: authHeader,
        body: JSON.stringify({
          content: dataJsContent,
          encoding: "utf-8"
        })
      });
      if (!dataBlobRes.ok) {
        const errText = await dataBlobRes.text();
        return res.status(dataBlobRes.status).json({ error: `Failed to create blob for src/data.js: ${errText}` });
      }
      const dataBlob = await dataBlobRes.json();

      // 4. Create blob for components.jsx
      console.log("Creating blob for src/components.jsx...");
      const compBlobRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/blobs`, {
        method: "POST",
        headers: authHeader,
        body: JSON.stringify({
          content: componentsJsxContent,
          encoding: "utf-8"
        })
      });
      if (!compBlobRes.ok) {
        const errText = await compBlobRes.text();
        return res.status(compBlobRes.status).json({ error: `Failed to create blob for src/components.jsx: ${errText}` });
      }
      const compBlob = await compBlobRes.json();

      // 5. Create new tree pointing to the new blobs
      console.log("Creating new git tree...");
      const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees`, {
        method: "POST",
        headers: authHeader,
        body: JSON.stringify({
          base_tree: baseTreeSha,
          tree: [
            {
              path: "src/data.js",
              mode: "100644",
              type: "blob",
              sha: dataBlob.sha
            },
            {
              path: "src/components.jsx",
              mode: "100644",
              type: "blob",
              sha: compBlob.sha
            }
          ]
        })
      });
      if (!treeRes.ok) {
        const errText = await treeRes.text();
        return res.status(treeRes.status).json({ error: `Failed to create Git tree: ${errText}` });
      }
      const treeData = await treeRes.json();

      // 6. Create commit
      console.log("Creating commit...");
      const commitRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits`, {
        method: "POST",
        headers: authHeader,
        body: JSON.stringify({
          message,
          tree: treeData.sha,
          parents: [latestCommitSha]
        })
      });
      if (!commitRes.ok) {
        const errText = await commitRes.text();
        return res.status(commitRes.status).json({ error: `Failed to create Git commit: ${errText}` });
      }
      const commitData = await commitRes.json();

      // 7. Update branch ref
      console.log(`Updating ref for branch: refs/heads/${actualBranch}...`);
      const refRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${actualBranch}`, {
        method: "PATCH",
        headers: authHeader,
        body: JSON.stringify({
          sha: commitData.sha,
          force: false
        })
      });
      if (!refRes.ok) {
        const errText = await refRes.text();
        return res.status(refRes.status).json({ error: `Failed to update branch reference: ${errText}` });
      }

      console.log("Commit pushed successfully!");
      return res.json({
        success: true,
        commitUrl: `https://github.com/${owner}/${repo}/commit/${commitData.sha}`,
        sha: commitData.sha,
        branch: actualBranch
      });

    } catch (error) {
      console.error("Error committing to GitHub:", error);
      return res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
  });

  // Serve static files / Vite Dev middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
