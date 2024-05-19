#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run push 'deploy'
npm run build

# 进入生成的文件夹
cd docs

git init
git add -A
git commit -m 'deploy'
git remote add origin https://github.com/2333Ge/personal-learning-blog.git    
git push -u -f origin main

cd -

# github actions 触发部署
# cd my_actions

# echo "publish: $(date +"%Y-%m-%d %H:%M:%S")" > publish.md
# git add .
# git commit -m "publish"

# git push -u -f origin main

# cd -