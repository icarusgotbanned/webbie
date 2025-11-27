# Logo Setup Guide

This guide shows you where to add your logo image and how to replace the "AA" placeholder throughout the website.

## Step 1: Add Your Logo Image

1. Place your logo file in the `public` folder:
   - Recommended location: `public/logo.png` or `public/logo.svg`
   - Recommended formats: PNG (with transparency) or SVG
   - Recommended sizes:
     - Small logo (header): 28x28px or 32x32px
     - Large logo (content areas): 64x64px or 128x128px
     - For best results, use SVG or a high-resolution PNG that scales well

## Step 2: Replace Logo Instances

### Header Logos (Small - 28x28px)

The small logo appears in the header of all pages. Replace the following in each file:

#### Files to update:
- `app/page.tsx` (line ~33-35)
- `app/download/page.tsx` (line ~53-55)
- `app/trust/page.tsx` (line ~10-12)
- `app/local-app/page.tsx` (line ~10-12)
- `app/reputation/page.tsx` (line ~10-12)
- `app/success/page.tsx` (line ~169-171 and line ~137-139)

**Replace this:**
```tsx
<div className="w-7 h-7 rounded bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-black text-xs">
  AA
</div>
```

**With this:**
```tsx
<img 
  src="/logo.png" 
  alt="Absolute Assistant" 
  className="w-7 h-7 rounded object-contain"
/>
```

### Large Logo in Content Areas (64x64px)

The large logo appears in download and success pages:

#### `app/download/page.tsx` (line ~70-72)

**Replace this:**
```tsx
<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-black text-2xl mx-auto mb-4">
  AA
</div>
```

**With this:**
```tsx
<img 
  src="/logo.png" 
  alt="Absolute Assistant" 
  className="w-16 h-16 rounded-2xl object-contain mx-auto mb-4"
/>
```

#### `app/success/page.tsx` (line ~184-186)

**Replace this:**
```tsx
<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-black text-2xl mx-auto mb-4">
  AA
</div>
```

**With this:**
```tsx
<img 
  src="/logo.png" 
  alt="Absolute Assistant" 
  className="w-16 h-16 rounded-2xl object-contain mx-auto mb-4"
/>
```

### Public HTML File

#### `public/index.html` (line ~386)

**Replace this:**
```html
<div class="logo">AA</div>
```

**With this:**
```html
<img src="/logo.png" alt="Absolute Assistant" class="logo" style="width:28px;height:28px;object-fit:contain" />
```

And update the CSS for `.logo` class (around line ~41-52) to remove the gradient background:

**Replace:**
```css
.logo{
  width:28px;
  height:28px;
  border-radius:6px;
  background:linear-gradient(135deg,#3b82f6,#10b981);
  display:flex;
  align-items:center;
  justify-content:center;
  color:white;
  font-weight:900;
  font-size:12px;
}
```

**With:**
```css
.logo{
  width:28px;
  height:28px;
  border-radius:6px;
  object-fit:contain;
}
```

## Quick Reference: All Logo Locations

1. **Header logos (small - 7x7 / 28px):**
   - `app/page.tsx` - line ~33-35
   - `app/download/page.tsx` - line ~53-55
   - `app/trust/page.tsx` - line ~10-12
   - `app/local-app/page.tsx` - line ~10-12
   - `app/reputation/page.tsx` - line ~10-12
   - `app/success/page.tsx` - line ~169-171 (header) and line ~137-139 (error state)

2. **Large logos (16x16 / 64px):**
   - `app/download/page.tsx` - line ~70-72
   - `app/success/page.tsx` - line ~184-186

3. **Public HTML:**
   - `public/index.html` - line ~386 and CSS around line ~41-52

## Tips

- Use SVG format for best quality at all sizes
- If using PNG, use a transparent background
- Ensure your logo looks good on dark backgrounds (the site uses dark theme)
- Test the logo at different screen sizes to ensure it scales properly
- The `object-contain` class ensures your logo maintains its aspect ratio

