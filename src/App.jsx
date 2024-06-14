import { useState } from 'react'
import { marked } from 'marked'
import './App.css'
// import { marked } from "https://esm.sh/marked"; // CodePen

// app start up text at the bottom since it's big

let pic = "ghost"; // for fun

// create new renderer to edit its link property to allow clicking a rendered link to work
const linkRenderer = new marked.Renderer();
//editing the link property
linkRenderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + "</a>";
};

function App() {
  const [maximized, setMaximized] = useState({
    editor: false,
    previewer: false,
    icon: "fa-maximize"
  });

  const [markdown, setMarkdown] = useState(initialMarkdown);

  marked.setOptions({
    breaks: true
  });
  // render carriage returns as line breaks
  //<br> renders a new line
  // 4 spaces starts a single line of code

  function handleEditorMaximize() {
    maximized.editor === false
      ? setMaximized({
          ...maximized,
          editor: true,
          icon: "fa-down-left-and-up-right-to-center"
        })
      : setMaximized({ ...maximized, editor: false, icon: "fa-maximize" });
  }

  function handlePreviewerMaximize() {
    maximized.previewer === false
      ? setMaximized({
          ...maximized,
          previewer: true,
          icon: "fa-down-left-and-up-right-to-center"
        })
      : setMaximized({ ...maximized, previewer: false, icon: "fa-maximize" });
  }

  return (
    <>
      <div
        className="editorWrap"
        hidden={maximized.previewer === true ? "hidden" : ""}
        style={maximized.editor === true ? { maxWidth: "700px" } : {}}
      >
        <Toolbar
          title="Markdown Editor"
          onClick={handleEditorMaximize}
          icon={maximized.icon}
        />
        <Editor
          text={markdown}
          onChange={(e) => {
            setMarkdown(e.target.value) 
            // console.log(e.target.value)
          }
        }
          maximized={maximized}
        />
      </div>
      <div
        className="previewWrap"
        hidden={maximized.editor === true ? "hidden" : ""}
      >
        <Toolbar
          title="Markup Preview"
          onClick={handlePreviewerMaximize}
          icon={maximized.icon}
        />
        <Previewer text={markdown} />
      </div>
    </>
  );
}

function Toolbar({ title, onClick, icon }) {
  return (
    <div className="toolbar">
      <i className={"fa fa-" + pic}></i>
      <span id="toolbar-text">{title}</span>
      <span
        className="maximize"
        style={{ cursor: "pointer" }}
        onClick={onClick}
      >
        <i className={"fa " + icon}></i>
      </span>
    </div>
  );
}

function Editor({ text, onChange, maximized }) {
  return (
    <textarea
      id="editor"
      value={text}
      onChange={(e) => onChange(e)}
      style={
        maximized.editor === true ? { height: "90vh", resize: "none" } : {}
      }
    ></textarea>
  );
}

function Previewer({ text }) {
  console.log(marked(text));
  return (
    // without the new link renderer, would just need: {{__html: marked(text)}}
    // marked() and marked.parse() work fine
    <div
      id="preview"
      dangerouslySetInnerHTML={{
        __html: marked(text, { renderer: linkRenderer })
      }}
    />
  );
}

const initialMarkdown =
  "[Markdown Syntax Guide](https://www.markdownguide.org/basic-syntax/)\n\n" +
  "# Welcome to my React Markdown App\n" +
  "## This is a sub-heading...\n" +
  "### And here's some other cool stuff:\n\n" +
  "Here's some inline code, `<div></div>`, between 2 backticks. \n\n" +
  "```\n// this is multi-line code:\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\n" +
  "Separate your text with using the html line break element. Here's a few empty lines for ya <br><br><br> and we're back.\n\n"+
  "You can also make text **bold**... whoa!\n\n" +
  "Or _italic_.\n\n" +
  "Or... wait for it... **_both!_**\n\n" +
  "And feel free to go crazy ~~crossing stuff out~~.\n\n" +
  "There's also [links](https://www.freecodecamp.org),\n\n and \n" +
  "> Block Quotes!\n\n" +
  "- And of course there are lists.\n" +
  "  - Some are bulleted.\n" +
  "     - With different indentation levels.\n" +
  "        - That look like this.\n" +
  "1. And there are numbered lists too.\n" +
  "1. Use just 1s if you want!\n" +
  "1. And last but not least, let's not forget embedded images:\n\n" +
  "![Nothing](https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-png-transparent.png)";

export default App;

// !!! The below render method is deprecated !!!
// ReactDOM.render(<App />, document.getElementById("root"));

// below is now the standard, in a two step process...
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
// or just one line it, and also use strict mode to catch bugs...
// const root = ReactDOM.createroot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
