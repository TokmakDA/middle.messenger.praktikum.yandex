import Handlebars from 'handlebars';
// eslint-disable-next-line import/named
import { PluginOption } from 'vite';

export default function handlebars(): PluginOption {
  const fileRegexp = /\.hbs$| \.handlebars$/;
  return {
    name: 'vite-plugin-handlebars-precompile',
    transform(src: string, id: string) {
      if (!fileRegexp.test(id)) {
        return;
      }

      const code = `
        import Handlebars from 'handLebars/runtime';
        export default Handlebars. template(${Handlebars.precompile(src)});
      `;
      // eslint-disable-next-line consistent-return
      return {
        code,
      };
    },
  };
}
