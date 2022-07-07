const e = React.createElement;

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
    breaks: true,
    highlight: function (code) {
      return Prism.highlight(code, Prism.languages.javascript, 'javascript');
    }
  });

// INSERTS target="_blank" INTO HREF TAGS (required for Codepen links)
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

marked.use({ renderer });

class App extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        markdown: placeholder,
        editorMaximized: false,
        previewMaximized: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
    this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
    }

    handleChange(event){
        this.setState({markdown: event.target.value})
    }

    handleEditorMaximize(){
        this.setState({editorMaximized: !this.state.editorMaximized});
    }
    handlePreviewMaximize(){
        this.setState({previewMaximized: !this.state.previewMaximized});
    }

    render() {
        let classes;
        if (this.state.editorMaximized){
            classes = ['editorWrap maximized', 'previewWrap hide', 'fa fa-compress'];
        } else if (this.state.previewMaximized){
            classes = ['editorWrap hide', 'previewWrap maximized', 'fa fa-compress'];
        } else if (!this.state.editorMaximized && !this.state.previewMaximized){
            classes = ['editorWrap', 'previewWrap', 'fa fa-arrows-alt'];
        }
        return (
            <div>
                <div className = {classes[0]}>
                <Toolbar text="Editor" icon={classes[2]} onClick={this.handleEditorMaximize}/>
                <Editor markdown={this.state.markdown} onChange={this.handleChange} />
                </div>
                <div className = {classes[1]}> 
                <Toolbar text="Previewer" icon={classes[2]} onClick={this.handlePreviewMaximize}/>     
                <Preview markdown={this.state.markdown} />
                </div>
            </div>
          );
    }
}

const Editor = (props) => {
    return (
      <textarea id="editor" type="text" onChange={props.onChange} value={props.markdown}></textarea>
    );
  };


const Preview = (props) => {
    let preview = props.markdown;
    let markdown = marked.parse(preview);
    return (
      <div dangerouslySetInnerHTML= {{__html: markdown}} id="preview"></div>
    );
  };

const Toolbar = (props) => {
    return (
      <div className="toolbar">
        <i className="fa fa-brands fa-github-alt" title="no-stack-dub-sack" />{props.text}
        <i className={props.icon} onClick={props.onClick}/>
      </div>
    );
  };

let domContainer = document.querySelector('#app');
let markdownEditor = ReactDOM.render(<App />, domContainer);

