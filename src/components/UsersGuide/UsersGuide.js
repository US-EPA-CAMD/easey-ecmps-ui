import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OpenInNew } from "@material-ui/icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getContent } from "../../utils/api/contentApi";
import "./UsersGuide.scss";

export const UsersGuideSimple = () => {
  const [mainContent, setMainContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "ECMPS Industry User Guide";
    getContent("/ecmps/resources/industry-user-guide.md").then((resp) => {
      setMainContent(resp.data);
    });
  }, []);

  const handleLinkClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href.includes('ecmps-beta.app.cloud.gov')) {
      window.open(href, '_blank', 'noopener,noreferrer');
      e.preventDefault();
    } else if (href.startsWith('/')) {
      e.preventDefault();
      navigate(href);
    }
  };
  const extractText = (children) => {
    if (typeof children === 'string') return children;
    if (Array.isArray(children)) {
      return children.map(child => {
        if (typeof child === 'string') return child;
        if (React.isValidElement(child)) {
          return extractText(child.props.children);
        }
        return '';
      }).join('');
    }
    if (React.isValidElement(children)) {
      return extractText(children.props.children);
    }
    return '';
  };

  const components = {
    a: ({ node, href, children, ...props }) => {
      const isExternal = href?.startsWith('http://') || href?.startsWith('https://');

      return (
        <a
          className="text-primary text-underline forceUnderlineText colorContrast"
          href={href}
          onClick={(e) => handleLinkClick(e, href)}
          title={isExternal ? `Opens in new tab: ${children}` : `Go to ${children}`}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children} {isExternal && <OpenInNew fontSize="small" />}
        </a>
      );
    },
    h2: ({ node, children, ...props }) => {
      const headingText = typeof children === 'string' ? children :
        (Array.isArray(children) ? children.join('') : '');
      const id = headingText.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      return (
        <h2 id={id} className="users-guide-h2">
          {children}
        </h2>
      );
    },
    h3: ({ node, children, ...props }) => {
      const headingText = typeof children === 'string' ? children :
        (Array.isArray(children) ? children.join('') : '');
      const id = headingText.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      return (
        <h3 id={id} className="users-guide-h3">
          {children}
        </h3>
      );
    },
    table: ({ node, children, ...props }) => (
      <div className="table-responsive">
        <table className="usa-table usa-table--striped" {...props}>
          {children}
        </table>
      </div>
    ),
    blockquote: ({ node, children, ...props }) => {
      const text = extractText(children);
      const hasAlert = text.includes('Alert:');

      const className = hasAlert ? 'alert-blockquote' : '';

      return (
        <div className={`${className} epa-blockquote`} {...props}>
          {children}
        </div>
      );
    },
    code: ({ node, inline, className, children, ...props }) => {
      return !inline ? (
        <pre className="code-block">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      ) : (
        <code className="inline-code" {...props}>
          {children}
        </code>
      );
    },
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="padding-top-7 padding-2 react-transition fade-in">
      <div className="grid-container">
        <div className="grid-row">
          <div className="grid-col-12">
            <div className="users-guide-content users-guide-content-simple">
              <ReactMarkdown
                children={mainContent}
                remarkPlugins={[remarkGfm]}
                components={components}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersGuideSimple;