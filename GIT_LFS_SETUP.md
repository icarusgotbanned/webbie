# Git LFS Setup for Absolute Assistant Installer

This repository uses Git LFS (Large File Storage) to track the installer file.

## Initial Setup

1. **Install Git LFS** (if not already installed):
   ```bash
   # Windows (using Chocolatey)
   choco install git-lfs
   
   # Or download from: https://git-lfs.github.com/
   ```

2. **Initialize Git LFS in this repository**:
   ```bash
   git lfs install
   ```

3. **Verify the .gitattributes file is set up**:
   The `.gitattributes` file is already configured to track:
   - `public/downloads/*.exe` files
   - All `.exe`, `.msi`, and `.zip` files

4. **Add your installer file**:
   ```bash
   # Place your installer in public/downloads/
   # Then add it:
   git add public/downloads/AbsoluteAssistantSetup.exe
   git commit -m "Add Absolute Assistant installer"
   git push
   ```

## Verifying Git LFS is Working

Check that files are tracked by LFS:
```bash
git lfs ls-files
```

You should see `public/downloads/AbsoluteAssistantSetup.exe` listed.

## Important Notes

- **Never commit large files directly** - Always use Git LFS
- The installer file will be stored in Git LFS, not in the regular Git history
- When cloning the repo, Git LFS files are downloaded automatically (if LFS is installed)
- If you need to update the installer, just replace the file and commit normally

## Troubleshooting

If you see errors about large files:
1. Make sure Git LFS is installed: `git lfs version`
2. Make sure LFS is initialized: `git lfs install`
3. Check .gitattributes exists and is correct
4. Re-add the file: `git rm --cached public/downloads/AbsoluteAssistantSetup.exe && git add public/downloads/AbsoluteAssistantSetup.exe`


