import React, { useState, useEffect } from 'react';
import { Home, User, Menu, X, Github, Linkedin, Mail, ExternalLink, Briefcase, GraduationCap } from 'lucide-react';
// Import generated blog posts
import generatedBlogPosts from './generatedBlogPosts.json';

// Make sure there are NO other imports here - everything should be in this file

// ============================================
// TYPES
// ============================================
interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  slug: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  live: string;
}

interface AuthorInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  avatar: string;
  skills: string[];
  experience: Array<{
    role: string;
    company: string;
    period: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    period: string;
  }>;
}

// ============================================
// DATA
// ============================================

const projects: Project[] = [
  {
    id: 1,
    title: "Online Bookstore System",
    description: "A complete bookstore management system with user authentication, book inventory management, and purchase functionality. Built with Java Swing for the GUI and MySQL for database management.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
    tags: ["Java", "Java Swing", "MySQL"],
    github: "https://github.com/yuandeleon09/Online-Bookstore-",
    live: "https://github.com/yuandeleon09/Online-Bookstore-"
  },
  {
    id: 2,
    title: "Bus Reservation System",
    description: "A web-based bus ticket booking system allowing users to search routes, check availability, and make reservations. Features responsive design and interactive booking interface.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/yuandeleon09/Bus-reservation",
    live: "https://github.com/yuandeleon09/Bus-reservation"
  },
  {
    id: 3,
    title: "Product Management System",
    description: "A robust product inventory and management system with CRUD operations, search functionality, and data validation. Developed using TypeScript for type-safe code.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    tags: ["TypeScript", "JavaScript"],
    github: "https://github.com/LawrenceDolorito/2BSIT-2-ProductManSys",
    live: "https://github.com/LawrenceDolorito/2BSIT-2-ProductManSys"
  },
  {
    id: 4,
    title: "Cooking Recipe App",
    description: "A mobile application for browsing and saving cooking recipes. Features include recipe search, step-by-step instructions, ingredient lists, and favorites. Built with React Native for cross-platform compatibility.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop",
    tags: ["React Native", "Mobile App"],
    github: "https://github.com/yourusername/cooking-app",
    live: "https://github.com/yourusername/cooking-app"
  }
];

const authorInfo: AuthorInfo = {
  name: "Yuan De Leon",
  title: "Full Stack Developer",
  bio: "Passionate developer with 5+ years of experience building web applications. Specialized in React, TypeScript, and Node.js. Love creating beautiful, functional user experiences.",
  email: "yuandeleon027@gmail.com",
  github: "https://github.com/yourusername",
  linkedin: "https://www.linkedin.com/in/de-leon-yuan-eissen-e-230b25392/",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
  skills: [
    "React", "TypeScript", "Node.js", "Python", 
    "MongoDB", "MYSQL", "JAVA", "REST APIs",
    "Tailwind CSS", "Git", "HTML", "CSS","Javascript"
  ],
  experience: [
    {
      role: "Proctor Agent",
      company: "Datamatics",
      period: "2024 - Present",
      description: "Giving Support for clients and users for the LSAC examination. Also giving the customer service they need."
    },
    {
      role: "Virtual Assitant(lister)",
      company: "Arthur Listing service",
      period: "2023 - 2024",
      description: "Listing of diamonds and copy pasting of data in excel sheets."
    },
    {
      role: "Virtual assistant",
      company: "admin assistant",
      period: "2021 - 2022",
      description: "Doing Tasks of an admin side tasks and create a task management for the client. Gained experience in developing system using Html,css, and javascript."
    }
  ],
  education: [
    {
      degree: "Bachelor of Science in Information Technology",
      school: "New Era University",
      period: "2023 - present"
    }
  ]
};

// ============================================
// COMPONENTS
// ============================================
interface AuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  authorInfo: AuthorInfo;
}

const AuthorModal: React.FC<AuthorModalProps> = ({ isOpen, onClose, authorInfo }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl">
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex justify-between items-start z-10">
          <div className="flex gap-6 items-start">
            <img 
              src={authorInfo.avatar} 
              alt={authorInfo.name}
              className="w-24 h-24 rounded-full border-4 border-cyan-500"
            />
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{authorInfo.name}</h2>
              <p className="text-cyan-400 text-lg mb-3">{authorInfo.title}</p>
              <div className="flex gap-4">
                <a href={`mailto:${authorInfo.email}`} className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <Mail size={20} />
                </a>
                <a href={authorInfo.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <Github size={20} />
                </a>
                <a href={authorInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">About Me</h3>
            <p className="text-gray-300 leading-relaxed">{authorInfo.bio}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {authorInfo.skills.map(skill => (
                <span key={skill} className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-full text-sm border border-cyan-500/30">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Briefcase size={20} className="text-cyan-400" />
              Experience
            </h3>
            <div className="space-y-4">
              {authorInfo.experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-cyan-500 pl-4">
                  <h4 className="text-lg font-semibold text-white">{exp.role}</h4>
                  <p className="text-cyan-400">{exp.company}</p>
                  <p className="text-gray-500 text-sm mb-2">{exp.period}</p>
                  <p className="text-gray-300">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <GraduationCap size={20} className="text-cyan-400" />
              Education
            </h3>
            <div className="space-y-4">
              {authorInfo.education.map((edu, index) => (
                <div key={index} className="border-l-2 border-cyan-500 pl-4">
                  <h4 className="text-lg font-semibold text-white">{edu.degree}</h4>
                  <p className="text-cyan-400">{edu.school}</p>
                  <p className="text-gray-500 text-sm">{edu.period}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN APP
// ============================================
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('blog');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [authorModalOpen, setAuthorModalOpen] = useState<boolean>(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load blog posts from generated JSON
    setLoading(true);
    
    // Use the generated blog posts directly
    const posts = generatedBlogPosts as BlogPost[];
    
    setBlogPosts(posts);
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderBlogList = () => (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text ">
      My Blog 
      </h1>
      <p className="text-gray-400 mb-12 text-lg">
       This is my Blog on my Information technology journey this will cover all of the Lessons and Ideas i gained when i am Learning.
        </p>
      
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
          <p className="text-gray-400 mt-4">Loading blog posts...</p>
        </div>
      ) : blogPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No blog posts found. Add .md files to public/blogs/</p>
        </div>
      ) : (
        <div className="space-y-6">
          {blogPosts.map(post => (
            <article 
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h2>
                <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                {new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
  })}
</span>
              </div>
              <p className="text-gray-300 mb-4">{post.excerpt}</p>
              <div className="flex gap-2 flex-wrap">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm border border-cyan-500/30">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );

  const renderBlogPost = () => {
    if (!selectedPost) return null;
    
    return (
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => setSelectedPost(null)}
          className="mb-6 text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
        >
          ← Back to Blog
        </button>
        
        <article className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
          <h1 className="text-4xl font-bold mb-4 text-white">{selectedPost.title}</h1>
          <div className="flex gap-2 mb-6 flex-wrap">
            {selectedPost.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm border border-cyan-500/30">
                {tag}
              </span>
            ))}
          </div>
          <div className="text-gray-400 mb-8">
          {new Date(selectedPost.date).toLocaleString('en-US', { 
           year: 'numeric', 
           month: 'short', 
           day: 'numeric',
           hour: '2-digit',
           minute: '2-digit'
  })}
</div>
          <div className="prose prose-invert max-w-none">
            <div className="text-gray-300 whitespace-pre-line leading-relaxed">
              {selectedPost.content}
            </div>
          </div>
        </article>
      </div>
    );
  };

  const renderPortfolio = () => (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Portfolio
        </h1>
        <p className="text-gray-400 text-lg">
          A collection of my recent projects and work
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map(project => (
          <div 
            key={project.id}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-500 transition-all group"
          >
            <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex gap-2 flex-wrap mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/30">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a 
                  href={project.github}
                  className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={18} />
                  Code
                </a>
                <a 
                  href={project.live}
                  className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={18} />
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'bg-gray-900/95 backdrop-blur-lg border-b border-gray-800' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setAuthorModalOpen(true)}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              {authorInfo.name}
            </button>
            
            <div className="hidden md:flex gap-8">
              <button 
                onClick={() => {setCurrentPage('blog'); setSelectedPost(null);}}
                className={`flex items-center gap-2 transition-colors ${currentPage === 'blog' ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'}`}
              >
                <Home size={20} />
                Blog
              </button>
              <button 
                onClick={() => setCurrentPage('portfolio')}
                className={`flex items-center gap-2 transition-colors ${currentPage === 'portfolio' ? 'text-cyan-400' : 'text-gray-300 hover:text-cyan-400'}`}
              >
                <User size={20} />
                Portfolio
              </button>
            </div>

            <div className="hidden md:flex gap-4">
              <a href={authorInfo.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github size={20} />
              </a>
              <a href={authorInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${authorInfo.email}`} className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>

            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-300"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <button 
                onClick={() => {setCurrentPage('blog'); setSelectedPost(null); setMenuOpen(false);}}
                className={`block w-full text-left py-2 ${currentPage === 'blog' ? 'text-cyan-400' : 'text-gray-300'}`}
              >
                Blog
              </button>
              <button 
                onClick={() => {setCurrentPage('portfolio'); setMenuOpen(false);}}
                className={`block w-full text-left py-2 ${currentPage === 'portfolio' ? 'text-cyan-400' : 'text-gray-300'}`}
              >
                Portfolio
              </button>
              <button 
                onClick={() => {setAuthorModalOpen(true); setMenuOpen(false);}}
                className="block w-full text-left py-2 text-gray-300"
              >
                About Me
              </button>
              <div className="flex gap-4 pt-4">
                <a href={authorInfo.github} target="_blank" rel="noopener noreferrer" className="text-gray-400">
                  <Github size={20} />
                </a>
                <a href={authorInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400">
                  <Linkedin size={20} />
                </a>
                <a href={`mailto:${authorInfo.email}`} className="text-gray-400">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="pt-32 pb-16 px-6">
        {currentPage === 'blog' && (selectedPost ? renderBlogPost() : renderBlogList())}
        {currentPage === 'portfolio' && renderPortfolio()}
      </main>

      <footer className="border-t border-gray-800 py-8 text-center text-gray-500">
      <p>© {new Date().getFullYear()} {authorInfo.name}. Built with React & TypeScript</p>
      </footer>

      <AuthorModal 
        isOpen={authorModalOpen}
        onClose={() => setAuthorModalOpen(false)}
        authorInfo={authorInfo}
      />
    </div>
  );
};

export default App;