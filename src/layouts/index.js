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
    const { children, pageContext } = this.props;
    return (
      <PageContainer theme={this.state.theme} isRoot={pageContext.isRoot}>
        {children}
      </PageContainer>
    );
  }
}

export default Layout;
