import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { OpenInNew } from "@material-ui/icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getContent } from "../../utils/api/contentApi";
import "./UsersGuide.scss";

const extractTextFromChildren = (children) => {
  if (typeof children === "string") return children;
  
  if (Array.isArray(children)) {
    return children.map(child => {
      if (typeof child === "string") return child;
      if (React.isValidElement(child)) {
        return extractTextFromChildren(child.props.children);
      }
      return "";
    }).join("");
  }
  
  if (React.isValidElement(children)) {
    return extractTextFromChildren(children.props.children);
  }
  
  return "";
};

const createHeadingId = (text) => {
  if (!text) return "";
  
  return text.toLowerCase()
    .replaceAll(/[^\w\s-]/g, "")
    .replaceAll(/\s+/g, "-")
    .replaceAll(/-+/g, "-")
    .trim();
};

const getHeadingText = (children) => {
  if (typeof children === "string") return children;
  
  if (Array.isArray(children)) {
    return children.join("");
  }
  
  return "";
};

const LinkComponent = ({ node, href, children, onLinkClick, ...props }) => {
  const isExternal = href?.startsWith("http://") || href?.startsWith("https://");
  const linkText = extractTextFromChildren(children);

  return (
    <a
      className="text-primary text-underline forceUnderlineText colorContrast"
      href={href}
      onClick={(e) => onLinkClick(e, href)}
      title={isExternal ? `Opens in new tab: ${linkText}` : `Go to ${linkText}`}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children} {isExternal && <OpenInNew fontSize="small" />}
    </a>
  );
};

const Heading2Component = ({ node, children, onLinkClick, ...props }) => {
  const headingText = getHeadingText(children);
  const id = createHeadingId(headingText);

  return (
    <h2 id={id} className="users-guide-h2">
      {children}
    </h2>
  );
};

const Heading3Component = ({ node, children, onLinkClick, ...props }) => {
  const headingText = getHeadingText(children);
  const id = createHeadingId(headingText);

  return (
    <h3 id={id} className="users-guide-h3">
      {children}
    </h3>
  );
};

const TableComponent = ({ node, children, ...props }) => (
  <div className="table-responsive">
    <table className="usa-table usa-table--striped" {...props}>
      {children}
    </table>
  </div>
);

const BlockquoteComponent = ({ node, children, ...props }) => {
  const text = extractTextFromChildren(children);
  const hasAlert = text.includes("Alert:");
  const className = hasAlert ? "alert-blockquote" : "";

  return (
    <div className={`${className} epa-blockquote`} {...props}>
      {children}
    </div>
  );
};

const CodeComponent = ({ node, inline, className, children, ...props }) => {
  if (inline) {
    return (
      <code className="inline-code" {...props}>
        {children}
      </code>
    );
  }
  
  return (
    <pre className="code-block">
      <code className={className} {...props}>
        {children}
      </code>
    </pre>
  );
};

export const UsersGuideSimple = () => {
  const [mainContent, setMainContent] = useState("");
  const navigate = useNavigate();

  const handleLinkClick = useCallback((e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (href.includes("http://") || href.includes("https://")) {
      window.open(href, "_blank", "noopener,noreferrer");
      e.preventDefault();
    } else if (href.startsWith("/")) {
      e.preventDefault();
      navigate(href);
    }
  }, [navigate]);

  useEffect(() => {
    document.title = "ECMPS Industry User Guide";
    getContent("/ecmps/resources/industry-user-guide.md").then((resp) => {
      setMainContent(resp.data);
    });
  }, []);

  useEffect(() => {
    const hash = globalThis.location?.hash || "";
    if (hash) {
      const elementId = hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  const components = React.useMemo(() => ({
    a: (props) => <LinkComponent {...props} onLinkClick={handleLinkClick} />,
    h2: (props) => <Heading2Component {...props} />,
    h3: (props) => <Heading3Component {...props} />,
    table: TableComponent,
    blockquote: BlockquoteComponent,
    code: CodeComponent,
  }), [handleLinkClick]);

  return (
    <div className="padding-top-7 padding-2 react-transition fade-in">
      <div className="grid-container">
        <div className="grid-row">
          <div className="grid-col-12">
            <div className="users-guide-content users-guide-content-simple">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={components}
              >
                {mainContent}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersGuideSimple;