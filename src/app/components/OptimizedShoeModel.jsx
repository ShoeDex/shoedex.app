"use client";
import { lazy, Suspense } from "react";

// 懒加载 3D 模型组件
const ShoeModel = lazy(() => import("../ShoeModel"));

// 轻量级 Loading 组件
function ModelLoader() {
  return (
    <div className="model-loader">
      <div className="loader-animation">
        <div className="shoe-silhouette"></div>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <p>Loading</p>
    </div>
  );
}

export default function OptimizedShoeModel() {
  return (
    <div className="optimized-model-container">
      <Suspense fallback={<ModelLoader />}>
        <ShoeModel />
      </Suspense>
    </div>
  );
}
