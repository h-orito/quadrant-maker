# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

「配置するやつメーカー」- ポジショニングマップ（四象限図）を作成・共有できるWebアプリケーション。ユーザーはテンプレートを作成し、URLを共有することで他のユーザーがそのマップ上にテキストや画像を配置できる。

## コマンド

```bash
npm run dev      # 開発サーバー起動 (localhost:3000)
npm run build    # プロダクションビルド
npm run lint     # ESLint実行
npm run start    # プロダクションサーバー起動
```

## 技術スタック

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Firebase Realtime Database（テンプレートの保存・取得）
- react-hook-form（フォーム管理）
- react-color（カラーピッカー）
- react-input-slider（位置調整スライダー）

## アーキテクチャ

### ルーティング構造

- `/` - テンプレート作成ページ (`src/app/page.tsx`, `src/app/maker.tsx`)
- `/template/[key]` - テンプレートを使った配置ページ（動的ルート）
- `/image` - 既存画像に項目を配置するページ

### 主要コンポーネント

- `src/app/_preview/preview.tsx` - 四象限マップのプレビュー表示（テキスト/画像アイテムの描画を含む）
- `src/app/maker.tsx` - テンプレート作成フォーム（タイトル、軸ラベル、配色設定）
- `src/app/template/[key]/input.tsx` - テンプレート上にコンテンツを配置するUI

### データ型定義

- `src/@types/template.d.ts` - Template型（タイトル、軸、色設定）
- `src/@types/content.d.ts` - Content型（配置アイテム。テキストまたは画像）

### Firebase連携

- `src/lib/firebase/firebase.ts` - Firebase初期化（クライアントサイドのみ）
- `src/components/firebase/firebase.ts` - テンプレートの保存・取得API

## 環境変数

Firebase設定は `src/constant/env.ts` で定義。必要な環境変数:
- FIREBASE_API_KEY
- FIREBASE_AUTH_DOMAIN
- FIREBASE_PROJECT_ID
- FIREBASE_STORAGE_BUCKET
- FIREBASE_MESSAGING_SENDER_ID
- FIREBASE_APP_ID
