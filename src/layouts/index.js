import React from 'react';
import { PageContainer } from '../components/page-container';

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
    const { children, location } = this.props;
    return (
      <PageContainer
        theme={this.state.theme}
        isRoot={location.pathname === '/'}
      >
        {children}
      </PageContainer>
    );
  }
}

export default Layout;
