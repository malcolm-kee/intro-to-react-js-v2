import Typograph from 'typography';

const typography = new Typograph({
  headerFontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans serif'],
  bodyFontFamily: ['Georgia', 'serif'],
  googleFonts: [
    {
      name: 'Material Icons',
      styles: ['400']
    }
  ]
});

export default typography;
