// components/Applications/FileManager/FileManager.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, 
  File, 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Search,
  Grid,
  List,
  Download,
  Upload,
  Plus,
  MoreVertical,
  FileText,
  Image,
  Music,
  Video,
  Archive,
  Code,
  Settings
} from 'lucide-react';
import './FileManager.css';

const fileStructure = {
  '/': {
    name: 'Root',
    type: 'folder',
    children: {
      'home': {
        name: 'home',
        type: 'folder',
        children: {
          'user': {
            name: 'user',
            type: 'folder',
            children: {
              'Documents': {
                name: 'Documents',
                type: 'folder',
                children: {
                  'resume.pdf': { name: 'resume.pdf', type: 'file', size: '2.1 MB', modified: '2024-01-15' },
                  'projects.md': { name: 'projects.md', type: 'file', size: '5.4 KB', modified: '2024-01-20' },
                  'notes.txt': { name: 'notes.txt', type: 'file', size: '1.2 KB', modified: '2024-01-18' },
                }
              },
              'Downloads': {
                name: 'Downloads',
                type: 'folder',
                children: {
                  'linux-portfolio.zip': { name: 'linux-portfolio.zip', type: 'file', size: '15.8 MB', modified: '2024-01-22' },
                  'wallpaper.jpg': { name: 'wallpaper.jpg', type: 'file', size: '3.2 MB', modified: '2024-01-19' },
                }
              },
              'Pictures': {
                name: 'Pictures',
                type: 'folder',
                children: {
                  'profile.jpg': { name: 'profile.jpg', type: 'file', size: '1.5 MB', modified: '2024-01-10' },
                  'screenshots': {
                    name: 'screenshots',
                    type: 'folder',
                    children: {
                      'desktop.png': { name: 'desktop.png', type: 'file', size: '2.8 MB', modified: '2024-01-21' },
                    }
                  }
                }
              },
              'Desktop': {
                name: 'Desktop',
                type: 'folder',
                children: {
                  'portfolio-link.desktop': { name: 'portfolio-link.desktop', type: 'file', size: '512 B', modified: '2024-01-25' },
                }
              }
            }
          }
        }
      },
      'var': {
        name: 'var',
        type: 'folder',
        children: {
          'www': {
            name: 'www',
            type: 'folder',
            children: {
              'portfolio': {
                name: 'portfolio',
                type: 'folder',
                children: {
                  'index.html': { name: 'index.html', type: 'file', size: '4.2 KB', modified: '2024-01-25' },
                  'style.css': { name: 'style.css', type: 'file', size: '8.7 KB', modified: '2024-01-25' },
                  'script.js': { name: 'script.js', type: 'file', size: '12.3 KB', modified: '2024-01-25' },
                }
              }
            }
          }
        }
      }
    }
  }
};

const getFileIcon = (filename, type) => {
  if (type === 'folder') return Folder;
  
  const ext = filename.split('.').pop().toLowerCase();
  switch (ext) {
    case 'pdf':
    case 'doc':
    case 'docx':
    case 'txt':
    case 'md':
      return FileText;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'svg':
      return Image;
    case 'mp3':
    case 'wav':
    case 'flac':
      return Music;
    case 'mp4':
    case 'avi':
    case 'mkv':
      return Video;
    case 'zip':
    case 'rar':
    case 'tar':
    case 'gz':
      return Archive;
    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
    case 'html':
    case 'css':
    case 'py':
    case 'java':
    case 'cpp':
      return Code;
    default:
      return File;
  }
};

const FileManager = () => {
  const [currentPath, setCurrentPath] = useState('/home/user');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [history, setHistory] = useState(['/home/user']);
  const [historyIndex, setHistoryIndex] = useState(0);

  const getCurrentFolder = () => {
    const pathParts = currentPath.split('/').filter(Boolean);
    let current = fileStructure['/'];
    
    for (const part of pathParts) {
      if (current.children && current.children[part]) {
        current = current.children[part];
      } else {
        return null;
      }
    }
    
    return current;
  };

  const getCurrentItems = () => {
    const folder = getCurrentFolder();
    if (!folder || !folder.children) return [];
    
    const items = Object.entries(folder.children).map(([key, value]) => ({
      ...value,
      key
    }));

    if (searchTerm) {
      return items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return items;
  };

  const navigateToPath = (newPath) => {
    setCurrentPath(newPath);
    setSelectedItems([]);
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newPath);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const navigateBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(history[historyIndex - 1]);
      setSelectedItems([]);
    }
  };

  const navigateForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(history[historyIndex + 1]);
      setSelectedItems([]);
    }
  };

  const handleItemClick = (item) => {
    if (item.type === 'folder') {
      const newPath = currentPath === '/' ? `/${item.key}` : `${currentPath}/${item.key}`;
      navigateToPath(newPath);
    } else {
      setSelectedItems([item.key]);
    }
  };

  const handleItemDoubleClick = (item) => {
    if (item.type === 'file') {
      // Simulate opening file
      console.log(`Opening file: ${item.name}`);
    }
  };

  const getBreadcrumbs = () => {
    const parts = currentPath.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'Root', path: '/' }];
    
    let currentBreadcrumbPath = '';
    for (const part of parts) {
      currentBreadcrumbPath += `/${part}`;
      breadcrumbs.push({ name: part, path: currentBreadcrumbPath });
    }
    
    return breadcrumbs;
  };

  const items = getCurrentItems();

  return (
    <div className="file-manager">
      {/* Header */}
      <div className="file-manager-header">
        <div className="file-manager-nav">
          <button 
            className="nav-button" 
            onClick={navigateBack}
            disabled={historyIndex <= 0}
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            className="nav-button" 
            onClick={navigateForward}
            disabled={historyIndex >= history.length - 1}
          >
            <ChevronRight size={18} />
          </button>
          <button 
            className="nav-button"
            onClick={() => navigateToPath('/home/user')}
          >
            <Home size={18} />
          </button>
        </div>

        <div className="file-manager-breadcrumbs">
          {getBreadcrumbs().map((crumb, index) => (
            <React.Fragment key={crumb.path}>
              <button
                className="breadcrumb-item"
                onClick={() => navigateToPath(crumb.path)}
              >
                {crumb.name}
              </button>
              {index < getBreadcrumbs().length - 1 && (
                <span className="breadcrumb-separator">/</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="file-manager-controls">
          <div className="search-container">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="view-controls">
            <button
              className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} />
            </button>
            <button
              className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="file-manager-toolbar">
        <div className="toolbar-group">
          <button className="toolbar-button">
            <Plus size={16} />
            New Folder
          </button>
          <button className="toolbar-button">
            <Upload size={16} />
            Upload
          </button>
          <button className="toolbar-button">
            <Download size={16} />
            Download
          </button>
        </div>
        
        <div className="toolbar-info">
          {items.length} items
          {selectedItems.length > 0 && ` • ${selectedItems.length} selected`}
        </div>
      </div>

      {/* Content */}
      <div className={`file-manager-content ${viewMode}`}>
        <AnimatePresence mode="wait">
          {items.length === 0 ? (
            <motion.div
              className="empty-folder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Folder size={48} />
              <p>This folder is empty</p>
            </motion.div>
          ) : (
            <motion.div
              className="file-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {items.map((item, index) => {
                const IconComponent = getFileIcon(item.name, item.type);
                const isSelected = selectedItems.includes(item.key);
                
                return (
                  <motion.div
                    key={item.key}
                    className={`file-item ${isSelected ? 'selected' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    onClick={() => handleItemClick(item)}
                    onDoubleClick={() => handleItemDoubleClick(item)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="file-icon">
                      <IconComponent size={viewMode === 'grid' ? 32 : 20} />
                    </div>
                    
                    <div className="file-info">
                      <div className="file-name">{item.name}</div>
                      {viewMode === 'list' && (
                        <div className="file-details">
                          {item.size && <span className="file-size">{item.size}</span>}
                          {item.modified && <span className="file-date">{item.modified}</span>}
                        </div>
                      )}
                    </div>
                    
                    {viewMode === 'grid' && item.size && (
                      <div className="file-meta">
                        <span className="file-size">{item.size}</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Status Bar */}
      <div className="file-manager-status">
        <div className="status-left">
          {getCurrentFolder()?.name || 'Unknown'} • {items.length} items
        </div>
        <div className="status-right">
          {selectedItems.length > 0 && `${selectedItems.length} selected`}
        </div>
      </div>
    </div>
  );
};

export default FileManager;