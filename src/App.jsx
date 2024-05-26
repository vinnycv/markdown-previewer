import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

// below is what is being imported from the codepen settings
// import React, { useState, useEffect, useRef } from 'https://esm.sh/react@18.2.0';
// import ReactDOM from 'https://esm.sh/react-dom@18.2.0';
// import { marked } from "https://esm.sh/marked";

// initializing text at the bottom since it's big

let pic = "ghost"; // for fun

// create new renderer to edit its link property to allow clikcing a rendered link to work
const linkRenderer = new marked.Renderer();
//editing the link property
linkRenderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + "</a>";
};
// render carriage returns as line breaks
marked.setOptions({
  breaks: true });


function App() {
  const [maximized, setMaximized] = React.useState({
    editor: false,
    previewer: false,
    icon: "fa-maximize" });


  const [markdown, setMarkdown] = React.useState(initialMarkdown);

  function handleEditorMaximize() {
    maximized.editor === false ?
    setMaximized({
      ...maximized,
      editor: true,
      icon: "fa-down-left-and-up-right-to-center" }) :

    setMaximized({ ...maximized, editor: false, icon: "fa-maximize" });
  }

  function handlePreviewerMaximize() {
    maximized.previewer === false ?
    setMaximized({
      ...maximized,
      previewer: true,
      icon: "fa-down-left-and-up-right-to-center" }) :

    setMaximized({ ...maximized, previewer: false, icon: "fa-maximize" });
  }

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("div", {
      className: "editorWrap",
      hidden: maximized.previewer === true ? "hidden" : "",
      style: maximized.editor === true ? { maxWidth: "700px" } : {} }, /*#__PURE__*/

    React.createElement(Toolbar, {
      title: "Markdown Editor",
      onClick: handleEditorMaximize,
      icon: maximized.icon }), /*#__PURE__*/

    React.createElement(Editor, {
      text: markdown,
      onChange: e => setMarkdown(e.target.value),
      maximized: maximized })), /*#__PURE__*/


    React.createElement("div", {
      className: "previewWrap",
      hidden: maximized.editor === true ? "hidden" : "" }, /*#__PURE__*/

    React.createElement(Toolbar, {
      title: "Markup Preview",
      onClick: handlePreviewerMaximize,
      icon: maximized.icon }), /*#__PURE__*/

    React.createElement(Previewer, { text: markdown }))));



}

function Toolbar({ title, onClick, icon }) {
  return /*#__PURE__*/(
    React.createElement("div", { className: "toolbar" }, /*#__PURE__*/
    React.createElement("i", { className: "fa fa-" + pic }),
    title, /*#__PURE__*/
    React.createElement("span", {
      className: "maximize",
      style: { cursor: "pointer" },
      onClick: onClick }, /*#__PURE__*/

    React.createElement("i", { className: "fa " + icon }))));



}

function Editor({ text, onChange, maximized }) {
  return /*#__PURE__*/(
    React.createElement("textarea", {
      id: "editor",
      value: text,
      onChange: e => onChange(e),
      style:
      maximized.editor === true ? { height: "90vh", resize: "none" } : {} }));



}

function Previewer({ text }) {
  return /*#__PURE__*/ (
    // without the new link renderer, would just need: {{__html: marked(text)}}
    // marked() and marked.parse() work fine
    React.createElement("div", {
      id: "preview",
      dangerouslySetInnerHTML: {
        __html: marked(text, { renderer: linkRenderer }) } }));



}

const initialMarkdown =
"[Markdown Syntax Guide](https://www.markdownguide.org/basic-syntax/)\n\n" +
"# Welcome to my React Markdown App\n" +
"## This is a sub-heading...\n" +
"### And here's some other cool stuff:\n\n" +
"Heres some inline code, `<div></div>`, between 2 backticks. \n\n" +
"```\n// this is multi-line code:\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\n" +
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

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));

// below also works, just a two step process
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
