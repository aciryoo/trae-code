
## 1. Architecture Design

```mermaid
graph TB
    subgraph Frontend
        A[React 前端应用]
        A1[配置页面组件]
        A2[生成页面组件]
        A3[结果展示组件]
    end
    
    subgraph Backend
        B[Express 后端服务]
        B1[GPT 生图 API 集成]
        B2[豆包视频生成 API 集成]
        B3[任务管理服务]
    end
    
    subgraph ExternalServices
        C[GPT 图像生成服务]
        D[豆包视频生成服务]
    end
    
    A --&gt;|HTTP 请求| B
    B --&gt;|API 调用| C
    B --&gt;|API 调用| D
```

## 2. Technology Description
- Frontend: React@18 + TypeScript + tailwindcss@3 + Vite
- Initialization Tool: vite-init
- Backend: Express@4 + TypeScript
- State Management: Zustand
- HTTP Client: Axios

## 3. Route Definitions

| Route | Purpose |
|-------|---------|
| / | 主页面，包含配置、参数设置和结果展示 |
| /api/generate-image | 后端 API：调用 GPT 生图服务 |
| /api/generate-video | 后端 API：调用豆包视频生成服务 |

## 4. API Definitions

### 4.1 生成图像 API
**Request:**
```typescript
interface GenerateImageRequest {
  prompt: string;
  size?: string;
  style?: string;
  apiUrl: string;
  apiKey: string;
}
```

**Response:**
```typescript
interface GenerateImageResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}
```

### 4.2 生成视频 API
**Request:**
```typescript
interface GenerateVideoRequest {
  imageUrl: string;
  apiUrl: string;
  apiKey: string;
  duration?: number;
}
```

**Response:**
```typescript
interface GenerateVideoResponse {
  success: boolean;
  videoUrl?: string;
  error?: string;
}
```

## 5. Server Architecture Diagram

```mermaid
graph LR
    A[前端请求] --&gt; B[Express 控制器]
    B --&gt; C[服务层]
    C --&gt; D1[GPT 生图服务]
    C --&gt; D2[豆包视频服务]
    D1 --&gt; E[外部 API]
    D2 --&gt; E
```

## 6. 项目结构

```
/workspace
├── src/                  # 前端代码
│   ├── components/       # React 组件
│   ├── pages/           # 页面组件
│   ├── utils/           # 工具函数
│   └── store/           # Zustand 状态管理
├── api/                 # 后端代码
│   ├── routes/          # API 路由
│   ├── services/        # 业务逻辑
│   └── index.ts         # 后端入口
├── package.json
├── tsconfig.json
└── vite.config.ts
```

