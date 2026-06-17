# 教学管理系统（学生端）

基于 **HarmonyOS / ArkTS** 开发的高校教学管理系统学生端应用，覆盖登录、课表、选课、成绩、评教、个人中心等常见校园场景。项目以 **本地 Mock 数据 + 课表导入** 为主，无需连接真实教务服务器即可完整演示业务流程。

---

## 功能概览

| 模块 | 说明 |
|------|------|
| 账号登录 | 学号密码登录、表单校验、登录状态持久化 |
| 首页工作台 | 轮播图、快捷入口、今日课程 |
| 我的课表 | 周视图网格、教学周切换、多学年期导入/切换/删除 |
| 选课 | 从课表读取课程，勾选控制是否在课表显示，学分上限 28 |
| 成绩查询 | 当前学期成绩与课表课程联动，支持分项成绩查看 |
| 量化评教 | 评教任务列表、问卷填写与提交 |
| 个人中心 | 个人信息、修改密码、学籍信息、系统设置、意见反馈 |
| 其他页面 | 今日课程、考试安排、作业列表等（Mock 数据） |

### 底部 Tab 导航

应用主界面（`MainPage`）包含 4 个 Tab：

1. **首页** — 工作台与今日课程
2. **课表** — 周视图课表
3. **成绩** — 学期成绩查询
4. **我的** — 个人中心

---

## 技术栈

| 项目 | 版本 / 说明 |
|------|-------------|
| 开发语言 | ArkTS |
| UI 框架 | ArkUI 声明式开发 |
| 目标平台 | HarmonyOS 手机（`phone`） |
| SDK 版本 | API 12（`5.0.0(12)`） |
| 构建工具 | Hvigor |
| IDE | DevEco Studio |

---

## 环境要求

1. 安装 [DevEco Studio](https://developer.huawei.com/consumer/cn/deveco-studio/)（建议 5.0 及以上）
2. 配置 HarmonyOS SDK **API 12**
3. 准备模拟器或真机（HarmonyOS 设备）

---

## 快速开始

### 1. 克隆项目

```bash
git clone <仓库地址>
cd edu_one
```

### 2. 用 DevEco Studio 打开

使用 DevEco Studio 打开项目根目录，等待依赖同步完成。

### 3. 编译运行

1. 在顶部选择目标设备（模拟器或真机）
2. 点击 **Run**（运行）按钮
3. 首次启动进入登录页，使用下方演示账号登录

### 4. 命令行构建（可选）

在项目根目录执行：

```bash
hvigorw assembleHap -p product=default
```

> 若提示找不到 `hvigorw`，请通过 DevEco Studio 菜单 **Build → Build Hap(s)/APP(s)** 进行构建。

---

## 演示账号

| 学号 | 密码 | 姓名 |
|------|------|------|
| `2023307021058` | `demo` | 周赛 |
| `2023307021059` | `123456` | 李华 |

登录成功后自动进入主界面，默认学期为 **2025-2026 第2学期**。

---

## 核心功能使用说明

### 课表

- 首次启动自动加载 `entry/src/main/resources/rawfile/default_schedule.xls` 默认课表
- 若无默认文件，则使用内置 Mock 课程数据生成课表
- 支持从教务系统导出的 **HTML 格式 xls 课表文件** 导入
- 支持多学年期切换、删除已导入课表
- 点击课程格可查看课程详情（教师、教室、周次等）

**导入步骤：**

1. 在教务系统导出「学生课表」（HTML 格式的 `.xls` 文件）
2. 进入 **课表** Tab → 点击右上角菜单 → **导入课表**
3. 选择文件后等待解析完成

### 选课（与课表联动）

选课页面课程列表**直接读取当前课表**，与课表保持同步：

- 进入选课页时，课表中的课程**默认全部勾选**
- **取消勾选**某门课 → 课表页面该课程消失
- **重新勾选** → 课程恢复到课表
- 本学期选课学分上限为 **28 分**（与课表 9 门课学分合计一致，全选即修满）

### 成绩

- **当前学期**成绩根据课表中的课程自动生成模拟数据
- 在选课页退选某门课后，成绩页对应课程同步消失
- 点击成绩卡片可查看分项成绩（平时、期中、期末、实验）
- 历史学期使用独立 Mock 数据

### 首页

- **今日课程**：根据当前教学周和今天星期几，从课表自动筛选
- **快捷入口**：我的课表、我的成绩、选课、量化评教

---

## 项目结构

```
edu_one/
├── AppScope/                          # 应用级配置与资源
│   ├── app.json5                      # 应用包名、版本等
│   └── resources/                     # 应用级字符串、图标
├── entry/                             # 主模块
│   ├── src/main/
│   │   ├── ets/
│   │   │   ├── entryability/          # 应用入口 Ability
│   │   │   ├── pages/                 # 页面
│   │   │   │   ├── LoginPage.ets      # 登录
│   │   │   │   ├── MainPage.ets       # 主框架（Tab）
│   │   │   │   ├── HomePage.ets       # 首页
│   │   │   │   ├── SchedulePage.ets   # 课表
│   │   │   │   ├── GradesPage.ets     # 成绩
│   │   │   │   ├── SelectionPage.ets  # 选课
│   │   │   │   ├── MinePage.ets       # 我的
│   │   │   │   ├── EvalPage.ets       # 量化评教
│   │   │   │   ├── TodayCoursePage.ets
│   │   │   │   ├── ProfileEditPage.ets
│   │   │   │   ├── PasswordEditPage.ets
│   │   │   │   ├── StatusPage.ets     # 学籍信息
│   │   │   │   ├── SettingsPage.ets
│   │   │   │   ├── FeedbackPage.ets
│   │   │   │   ├── ExamsPage.ets
│   │   │   │   └── AssignmentsPage.ets
│   │   │   ├── components/            # 公共 UI 组件
│   │   │   │   ├── TopBar.ets
│   │   │   │   ├── TabBar.ets
│   │   │   │   ├── CommonButton.ets
│   │   │   │   ├── ConfirmDialog.ets
│   │   │   │   └── ...
│   │   │   ├── model/                 # 数据模型接口
│   │   │   │   ├── CourseModel.ets
│   │   │   │   ├── GradeModel.ets
│   │   │   │   ├── UserModel.ets
│   │   │   │   └── ...
│   │   │   ├── mock/
│   │   │   │   └── MockData.ets       # 全局 Mock 数据
│   │   │   └── utils/                 # 工具类
│   │   │       ├── ScheduleStore.ets  # 课表存储与解析
│   │   │       ├── ScheduleParser.ets # 课表 HTML 解析
│   │   │       ├── GradeStore.ets     # 成绩生成（联动课表）
│   │   │       ├── DateUtils.ets      # 教学周/日期工具
│   │   │       └── ...
│   │   ├── resources/
│   │   │   ├── base/profile/main_pages.json  # 页面路由注册
│   │   │   └── rawfile/default_schedule.xls  # 默认课表文件
│   │   └── module.json5               # 模块配置
│   └── oh-package.json5
├── hvigor/                            # 构建配置
├── build-profile.json5
└── oh-package.json5
```

---

## 数据与状态管理

### 全局状态（AppStorage）

应用通过 `AppStorage` 管理跨页面共享状态，在 `EntryAbility.onCreate` 中初始化：

| Key | 用途 |
|-----|------|
| `isLoggedIn` | 是否已登录 |
| `studentId` / `studentName` | 当前学生信息 |
| `currentSemester` | 当前学年学期 |
| `currentScheduleKey` | 当前课表学期键（如 `2025-2026-2`） |
| `currentWeek` | 当前教学周 |
| `mainTabIndex` | 底部 Tab 索引 |
| `scheduleTabToken` | 课表刷新信号（选课变更时递增） |
| `importedSchedulesMapJson` | 已导入课表数据（持久化） |
| `todayCoursesJson` | 今日课程缓存 |

### 持久化存储（PersistentStorage）

| Key | 用途 |
|-----|------|
| `avatarUri` | 用户头像路径 |

### 核心业务数据流

```
课表（ScheduleStore）
    ├── 选课页（SelectionPage）读取课程列表，勾选/取消联动课表 entries
    ├── 成绩页（GradeStore）根据课表课程生成模拟成绩
    └── 首页今日课程从课表按周次和星期筛选
```

---

## Mock 数据说明

项目业务数据集中在 `entry/src/main/ets/mock/MockData.ets`，包括：

- 学生用户、学籍信息
- 课程基础数据（`MOCK_COURSES`，9 门课，共 28 学分）
- 选课轮次、评教任务、考试安排、作业等

**注意：** 本项目为演示/原型应用，除课表导入外，其余数据均为本地模拟，不连接真实教务 API。

---

## 默认课表课程

| 课程名称 | 课号 | 学分 |
|----------|------|------|
| 鸿蒙应用开发初级认证 | VDZ02119204.09 | 3 |
| 计算机组成原理 | VDZ02112704.11 | 4 |
| 软件测试与管理 | VDZ02114904.10 | 3 |
| 编译原理 | VDZ02103003.10 | 4 |
| 大型数据库管理与维护 | VDZ02115104.10 | 3 |
| 软件工程 | VDZ02102903.11 | 3 |
| 鸿蒙移动应用开发综合实践 | VDZ02119303.09 | 4 |
| 中国近现代史纲要 | VMK01100203.43 | 2 |
| 博物馆展览鉴赏 | VJW01102302.01 | 2 |
| **合计** | | **28** |

---

## 页面路由

所有页面在 `entry/src/main/resources/base/profile/main_pages.json` 中注册：

| 路由 | 页面 | 入口 |
|------|------|------|
| `pages/LoginPage` | 登录（启动页） | 应用启动 |
| `pages/MainPage` | 主框架 | 登录成功 |
| `pages/SelectionPage` | 选课 | 首页快捷入口 |
| `pages/EvalPage` | 量化评教 | 首页快捷入口 |
| `pages/TodayCoursePage` | 今日课程 | 首页「查看全部」 |
| `pages/ProfileEditPage` | 个人信息 | 我的 → 个人信息 |
| `pages/PasswordEditPage` | 修改密码 | 我的 → 修改密码 |
| `pages/StatusPage` | 学籍信息 | 我的 → 学籍信息 |
| `pages/SettingsPage` | 系统设置 | 我的 → 系统设置 |
| `pages/FeedbackPage` | 意见反馈 | 我的 → 意见反馈 |

---

## 开发说明

### 修改 Mock 数据

编辑 `entry/src/main/ets/mock/MockData.ets` 即可调整学生账号、课程、成绩、评教等模拟数据。

### 新增页面

1. 在 `entry/src/main/ets/pages/` 下创建 `.ets` 页面文件
2. 在 `main_pages.json` 中注册路由
3. 使用 `router.pushUrl({ url: 'pages/YourPage' })` 跳转

### 课表解析扩展

课表 HTML 解析逻辑位于 `entry/src/main/ets/utils/ScheduleParser.ets`，支持教务系统导出的标准课表格式（含 `manualArrangeCourseTable` 或 `节次/周次` 等标识）。

### 代码规范

项目配置了 `code-linter.json5`，建议在 DevEco Studio 中开启代码检查。

---

## 常见问题

**Q：登录提示学号不存在？**  
A：请使用文档中的演示学号，或在 `MockData.ets` 的 `VALID_STUDENTS` 中添加新账号。

**Q：课表为空？**  
A：检查 `rawfile/default_schedule.xls` 是否存在；也可手动导入教务系统导出的课表文件。

**Q：选课取消后课表没更新？**  
A：返回课表 Tab 即可，系统通过 `scheduleTabToken` 自动触发刷新。

**Q：导入课表失败？**  
A：请确认文件为教务系统「学生课表」导出的 HTML 格式 `.xls` 文件，且包含学期标题和课程表格。

---

## 许可证

本项目仅供学习与交流使用。
