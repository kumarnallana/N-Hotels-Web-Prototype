# Agent Operating Rules & Commit Guidelines

## Workspace & Git Rules
- Perform all development, Git operations, validation, commits, and pushes only from `c:\KUMARS-SPACE-ORIGINAL\PROJECT-N-HOTELS\N-Hotels-Web-Prototype`.
- Before any mutation, confirm `git rev-parse --show-toplevel` resolves exactly to `c:\KUMARS-SPACE-ORIGINAL\PROJECT-N-HOTELS\N-Hotels-Web-Prototype`. Stop if it does not.
- `C:\KUMARS-SPACE-ORIGINAL\Personal-Space` is provenance-only. Do not develop, restore, merge, commit, or validate there.
- Do not copy `.git` metadata between folders or initialize a replacement repository inside another SYORA directory.
- Preserve the password-recovery and Resend work from commits `254f897` and `e726c87`.
- Preserve domain-owned styles under `frontend/src/styles`; keep component files focused on markup, behavior, state, and accessibility.
- Keep local environment files ignored. Never print, copy into tracked files, or commit their contents.

## Standard Git Command Output Format
After every conversation and implementation, always provide the Git sequence in this exact, clean format without listing individual files or adding unnecessary noise:

```bash
cd c:\KUMARS-SPACE-ORIGINAL\PROJECT-N-HOTELS\N-Hotels-Web-Prototype
git add .
git commit -m "<concise conventional commit message>"
git push
```

