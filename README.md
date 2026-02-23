# Best Travel (Vite + React + Tailwind)

## Install
```bash
npm install
```

## Configure EmailJS
1. Copy `.env.example` to `.env`
2. Fill:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

In EmailJS template, use variables:
- `{{full_name}}`, `{{email}}`, `{{phone}}`, `{{service}}`, `{{message}}`, `{{source}}`

## Run
```bash
npm run dev
```

## Build
```bash
npm run build
npm run preview
```
