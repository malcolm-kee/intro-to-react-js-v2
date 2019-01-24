import Typograph from 'typography';

const typography = new Typograph({
  headerFontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica',
    'Arial',
    'sans serif'
  ],
  bodyFontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Georgia',
    'serif'
  ],
  googleFonts: [
    {
      name: 'Material Icons',
      styles: ['400']
    }
  ],
  overrideStyles: ({ rhythm }) => ({
    blockquote: {
      color: '#000000',
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: rhythm(1 / 2),
      paddingRight: rhythm(2 / 3),
      paddingTop: rhythm(1 / 2),
      paddingBottom: rhythm(1 / 2),
      borderLeftColor: '#8d8d8d',
      borderLeftWidth: rhythm(1 / 3),
      borderLeftStyle: 'solid'
    }
  })
});

export default typography;
