
### git  stash用法：
```
git stash:会把所有为提交的更改都保存起来，当前的工作目录就干净了。
git status:查看工作区状态。
git stash pop: 回复之前的缓存工作目录。
git stash apply:将缓存堆栈中的stash多次应用到目录中，不删除stash拷贝
git stash list:查看现有的stash
git stash drop:移除stash ,后面可以跟着stash名字
git stash clear:删除所有缓存stash

```
### git branch
```
git branch : 查看本地分支
git branch -r :查看远端分支
git branch -a ： 查看已有的本地分支和远端分支（红色高亮起来）
git branch -D  feature/company-new 删除本地分支	
git branch  -r  -D   origin/feature/company-new 删除远端分支
git branch  feature/compant : 创建分支
```
### git reset 
```
git reset --hard : 修改分支的head，并置工作区为目标版本的内容。
git reset --soft : 修改分支的head，原版本相对于目标版本的差异被放入暂存区。
git reset --mixed :修改分支的head，原版本相对于目标版本的差异被放入工作区。
git revert -e 删除某次提交 并创建提交
```
### git log 
```
git log
git log -p  按照补丁格式显示差异
git log --stat 显示每次更新的文件修改统计信息
git log --author="zhangsongnan"
git log 文件名     查看该文件的提交记录
git show 提交id   查看该次提交都修改了什么
git reflog 查看本地head指向
```
```
git init 初始化git仓库
git add 把对象存储到暂存区
git commit :提交
git push 推送本地数据到远程仓库
git checkout -b bugFix  :创建新分支，并切换到该分支
git checkout  HEAD^ :切换到上次提交记录 （HEAD^向上移动）
git reset  HEAD~1 ：切换到上次提交
git checkout ：切换分支
git merge  master：合并分支
git cherry-pick <提交号> 将一些提交复制到当前所在的位置
```

