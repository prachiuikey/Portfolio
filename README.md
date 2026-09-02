# Prachi Uikey - Senior Full Stack Engineer Portfolio

A modern, responsive portfolio website showcasing 5+ years of experience building scalable web and backend systems.

## 🚀 Features

- **Responsive Design**: Optimized for all screen sizes
- **Smooth Animations**: Letter-by-letter hero animation and typewriter effects (respects `prefers-reduced-motion`)
- **Scroll Progress**: Visual indicator showing page scroll position
- **Dynamic Navigation**: Active link highlighting based on scroll position
- **Performance Optimized**: Efficient scroll and resize event handling
- **Modern Typography**: Custom fonts with proper preloading

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES5+)
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Fonts**: Self-hosted WebFonts (Sora display, Inter body)
- **Containerization**: Docker (optional)
- **Deployment**: Static site (any web server compatible)

## 📂 Project Structure

```
portfolio/
├── index.html              # Main HTML structure
├── app.js                  # JavaScript functionality (scroll, animations, navigation)
├── style.css               # Main stylesheet
├── fonts.css               # Font definitions and imports
├── Dockerfile              # Docker configuration
├── README.md               # Project documentation
├── .gitignore              # Git ignore rules
├── fonts/                  # Custom font files
│   ├── Sora-800-latin.woff2
│   └── Inter-400-latin.woff2
└── .git/                   # Git repository
```

## 🏃 Getting Started

### Prerequisites
- Any modern web browser
- Python 3 or Node.js (optional, for local development server)
- Docker (optional, for containerized deployment)

### Running Locally

1. **Clone or navigate to the project**
```bash
cd portfolio
```

2. **Open in browser**
   - Simply open `index.html` in your web browser, or
   - Use a local web server (recommended):
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```

3. **Access the portfolio**
   - Open your browser and navigate to `http://localhost:8000`

## 🐳 Docker Deployment

### Build the Docker image
```bash
docker build -t prachi-portfolio:latest .
```

### Run the container
```bash
docker run -p 80:80 prachi-portfolio:latest
```

The portfolio will be available at `http://localhost`

## 🎨 Customization

### Updating Content
Edit the content sections in `index.html`:
- Hero section
- About section
- Skills section
- What I do section
- Contact information

### Styling
Modify `style.css` for visual changes and `fonts.css` for typography adjustments.

### JavaScript Behavior
Update `app.js` to modify:
- Scroll progress bar behavior
- Navigation active state logic
- Animation timing and effects
- Typewriter effect parameters

## ♿ Accessibility

- Respects `prefers-reduced-motion` media query for animations
- Semantic HTML structure with proper ARIA labels
- Skip-to-content link for keyboard navigation
- Proper contrast ratios and readable font sizes

## 📋 Sections

1. **Hero**: Animated introduction with role/position
2. **About**: Professional background and expertise
3. **Skills**: Technical skills and competencies
4. **What I do**: Services and focus areas
5. **Contact**: Get in touch call-to-action

## 📧 Contact

- Email: prachiuikey75@gmail.com
- Website: [Your Portfolio URL]

## 📝 License

This portfolio is personal work. All rights reserved.

## 🔧 Health Check & Deployment Status

The site is ready for deployment on any static hosting platform:
- **GitHub Pages** (recommended for portfolios)
- **Vercel**
- **Netlify**
- **AWS S3 + CloudFront**
- **Docker** (for containerized deployment)

---

Built with care and attention to performance and user experience.
