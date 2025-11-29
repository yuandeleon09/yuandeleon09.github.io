const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

// Paths
const blogsDir = path.join(__dirname, '../public/blogs');
const outputFile = path.join(__dirname, '../src/generatedBlogPosts.json');

// Function to parse markdown with front matter
function parseMarkdown(markdown) {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = markdown.match(frontMatterRegex);
  
  if (match) {
    const metadataStr = match[1];
    const content = match[2].trim();
    
    const metadata = {};
    metadataStr.split('\n').forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
        metadata[key] = value;
      }
    });
    
    // Parse tags if they exist
    if (metadata.tags && typeof metadata.tags === 'string') {
      metadata.tags = metadata.tags.split(',').map(tag => tag.trim());
    }
    
    return { metadata, content };
  }
  
  return { metadata: {}, content: markdown };
}

// Main function to build blog posts
async function buildBlogPosts() {
  try {
    console.log('🔍 Looking for markdown files in:', blogsDir);
    
    // Check if blogs directory exists
    if (!fs.existsSync(blogsDir)) {
      console.log('📁 Creating blogs directory...');
      fs.mkdirSync(blogsDir, { recursive: true });
    }
    
    // Get all .md files
    const files = glob.sync('*.md', { cwd: blogsDir });
    
    if (files.length === 0) {
      console.log('⚠️  No markdown files found in public/blogs/');
      console.log('📝 Creating a sample blog post...');
      
      // Create a sample blog post
      const samplePost = `---
title: Welcome to My Blog
date: ${new Date().toISOString().split('T')[0]}
tags: Welcome, Blog, First Post
excerpt: This is my first blog post, welcome!
---

# Welcome to My Blog

This is an automatically generated sample post. You can delete this and add your own markdown files!

## Getting Started

1. Create .md files in \`public/blogs/\`
2. Run \`npm run build:blog\`
3. Your posts will be automatically loaded!

Enjoy writing!`;
      
      fs.writeFileSync(path.join(blogsDir, 'welcome.md'), samplePost);
      files.push('welcome.md');
    }
    
    console.log(`📚 Found ${files.length} blog post(s)`);
    
    const blogPosts = [];
    
    // Process each markdown file
    files.forEach((file, index) => {
      console.log(`📖 Processing: ${file}`);
      const filePath = path.join(blogsDir, file);
      const markdown = fs.readFileSync(filePath, 'utf-8');
      const { metadata, content } = parseMarkdown(markdown);
      
      // Extract excerpt from content if not in metadata
      const plainText = content.replace(/^#.*$/gm, '').replace(/\*\*/g, '').trim();
      const excerpt = (metadata.excerpt || plainText.substring(0, 150).trim()) + '...';
      
      blogPosts.push({
      id: index + 1,
      title: metadata.title || 'Untitled Post',
      date: metadata.date || new Date().toISOString(),
      excerpt: excerpt,
      content: content,
      tags: metadata.tags || [],
      slug: file.replace('.md', ''),
      fileName: file
      });
    });
    
    // Sort by date (newest first)
    blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Write to JSON file
    fs.writeFileSync(outputFile, JSON.stringify(blogPosts, null, 2));
    
    console.log('✅ Blog posts built successfully!');
    console.log(`📄 Output: ${outputFile}`);
    console.log(`📊 Total posts: ${blogPosts.length}`);
    
  } catch (error) {
    console.error('❌ Error building blog posts:', error);
    process.exit(1);
  }
}

// Run the build
buildBlogPosts();