/* eslint no-console:0 */
import React from 'react';
import ReactDom from 'react-dom';
import expect from 'expect.js';
import TestUtils from 'react-dom/test-utils';
import ticker from 'rc-tween-one/lib/ticker';
import ScrollAnim from '../index';

require('./link.spec.less');

describe('rc-scroll-anim', () => {
  let div;
  let instance;

  function createScrollLink(props) {
    class LinkDemo extends React.PureComponent {

      onFocus = (e) => {
        const dom = e.target;
        this.barAnimate(dom);
      }

      barAnimate = (dom) => {
        const bar = this.bar;
        bar.style.left = `${dom.getBoundingClientRect().left}px`;
      }

      render() {
        return (<div
          style={{ height: 500, overflow: 'scroll', position: 'absolute', width: '100%', top: 0 }}
          id="c-div"
        >
          <div className="nav">
            <ScrollAnim.Link
              className="nav-list"
              to="page0"
              {...this.props}
              targetId="c-div"
              onFocus={this.onFocus}
            >
              page0
            </ScrollAnim.Link>
            <ScrollAnim.Link
              className="nav-list"
              to="page1"
              {...this.props}
              targetId="c-div"
              onFocus={this.onFocus}
            >
              page1
            </ScrollAnim.Link>
            <div ref={(c) => { this.bar = c; }} className="nav-bar" />
          </div>
          <ScrollAnim.Element style={{ height: 1000 }} id="page0" className="page" targetId="c-div">
            示例
          </ScrollAnim.Element>
          <ScrollAnim.Element style={{ height: 1000 }} id="page1" className="page" targetId="c-div">
            示例
          </ScrollAnim.Element>
        </div>);
      }
    }
    return ReactDom.render(<LinkDemo {...props} />, div);
  }

  beforeEach(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(() => {
    try {
      ReactDom.unmountComponentAtNode(div);
      document.body.removeChild(div);
    } catch (e) {
      console.log(e);
    }
  });

  function getFloat(str) {
    return parseFloat(str);
  }

  it('link bar and active', (done) => {
    document.body.scrollTop = 0;
    instance = createScrollLink();
    const listChild = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'nav-list');
    const barChild = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'nav-bar')[0];
    ticker.timeout(() => {
      console.log('bar left:', barChild.style.left || 0);
      expect(getFloat(barChild.style.left) || 0).to.be(0);
      const cDom = document.getElementById('c-div');
      cDom.scrollTop = 1001;
      console.log('scrollTop:', cDom.scrollTop);
      ticker.timeout(() => {
        console.log('bar left:', barChild.style.left);
        console.log('className 0:', listChild[0].className);
        console.log('className 1:', listChild[1].className);
        expect(listChild[1].className.split(' ')[1]).to.be('active');
        expect(getFloat(barChild.style.left)).to.be(100);
        done();
      }, 100);
    }, 100);
  });
});
