import React from 'react';
import { PageContainer } from '../components/page-container';
import { Transition } from '../components/transition';

class Layout extends React.Component {
  state = {
    theme: null
  };

  componentDidMount() {
    this.setState({ theme: window.__theme });
    window.__onThemeChange = () => {
      this.setState({ theme: window.__theme });
    };
  }

  render() {
    const { children, pageContext, location } = this.props;
    return (
      <PageContainer theme={this.state.theme} isRoot={pageContext.isRoot}>
        <Transition location={location}>{children}</Transition>
      </PageContainer>
    );
  }
}

export default Layout;
