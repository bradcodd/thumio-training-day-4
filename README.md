## Author

Brad Codd

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1DPMSZ-E8SiIBMw0tRyquouEGx6Oqb-HL

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env](.env) to your Gemini API key
3. Run the app:
   `npm run dev`


**New repository**
git clone -b front-end --single-branch https://github.com/bradcodd/thumio-training-day-3.git thumio-training-day-4
cd thumio-training-day-4
copy ..\thumio-training-day-3\.env
rd /s .git
git init
git config --global --add safe.directory "E:/Projects/Vibe Coding/thumio-training-day-4"
git add .
git status
git commit -m "Cloned from thumio-training-day-3/front-end"
git branch -M main
git remote add origin https://github.com/bradcodd/thumio-training-day-4.git
git push -u origin main

npm install
