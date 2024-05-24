// use jsx to render html, do not modify simple.html
import ScrollAnim from 'rc-scroll-anim';
import React from 'react';
import ReactDOM from 'react-dom';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import Animate from 'rc-animate';
import './assets/index.less';

const _package = require('../package.json');

const Link = ScrollAnim.Link;
const Element = ScrollAnim.Element;
const ScrollOverPack = ScrollAnim.OverPack;
const EventListener = ScrollAnim.Event;
// ScrollAnim.scrollScreen({scrollInterval: 600});
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    // 添加改变窗口事件,可加setTimeout
    this.barAnimate();
    EventListener.addEventListener('resize.userResize', this.barAnimate.bind(this));
    setTimeout(() => {
      this.setState({ show: true });
    }, 1500);
  }

  onFocus = (e) => {
    this.dom = e.target;
    this.barAnimate();
  }

  barAnimate() {
    if (!this.dom) {
      return;
    }
    const bar = this.bar;
    bar.style.left = `${this.dom.getBoundingClientRect().left}px`;
  }

  render() {
    return (<div>
      <div className="nav">
        <div className="logo">
          <p>Ant Motion</p>
        </div>
        <div className="nav-wap">
          <Link className="nav-list" to="page0" showHeightActive={['50%', '10%']}
            onFocus={this.onFocus}
            ref={(c) => {
              this.dom = ReactDOM.findDOMNode(c);
            }}
          >
            Example
          </Link>
          <Link className="nav-list" to="page1" showHeightActive={['10%', '60%']} toShowHeight
            onFocus={this.onFocus}
          >
            Example2
          </Link>
          <Link className="nav-list" to="page2" showHeightActive={['60%', '50%']} toShowHeight
            onFocus={this.onFocus}
          >
            Example3
          </Link>
          <Link className="nav-list" to="page3" offsetTop={100}
            onFocus={this.onFocus}
          >
            Example4
          </Link>
          <div ref={(c) => { this.bar = c; }} className="nav-bar" />
        </div>
      </div>
      {this.state.show && [
        <Element className="pack-page page0" id="page0" key="banner">
          <QueueAnim className="home-title">
            <div className="page-title" key="title">
              <p>{_package.name}@{_package.version}</p>
            </div>
            <div className="page-description" key="c">
              <p>The link demo</p>
            </div>
          </QueueAnim>
        </Element>,
        <ScrollOverPack id="page1" className="page1" key="1">
          <TweenOne className="tween-one" key="0" animation={{ opacity: 1 }}>
            默认进入与出场
          </TweenOne>
          <QueueAnim key="1">
            <div key="0" className="demo-content" />
            <div key="1" className="demo-content" style={{ backgroundColor: '#F38EAD' }} />
            <div key="2" className="demo-content" />
            <div key="3" className="demo-content" />
          </QueueAnim>
        </ScrollOverPack>,

        <ScrollOverPack
          className="pack-page page2"
          style={{ backgroundColor: '#0098CE' }}
          always={false}
          id="page2"
          key="2"
        >
          <div className="page2-title" key="title">只进入一次</div>
          <Animate key="0" transitionName="fade" transitionAppear>
            <div className="demo-content2" />
          </Animate>
          <TweenOne
            className="demo-content2"
            animation={{ y: 0, opacity: 1 }}
            key="1"
            style={{ transform: 'translateY(100px)', opacity: 0 }}
          />
        </ScrollOverPack>,

        <ScrollOverPack
          className="pack-page page3"
          style={{ backgroundColor: '#174270' }}
          playScale={0.8}
          id="page3"
          key="3"
        >
          <TweenOne animation={{ opacity: 1 }} style={{ opacity: 0 }} key="title"
            className="page2-title"
          >
            在页面80％时进入
          </TweenOne>
          <Animate key="0" transitionName="fade" transitionAppear>
            <div className="demo-content" />
          </Animate>
          <TweenOne
            className="demo-content"
            animation={{ y: 0, opacity: 1 }}
            key="1"
            style={{ transform: 'translateY(100px)', opacity: 0 }}
          />
        </ScrollOverPack>,
      ]}
    </div>);
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
