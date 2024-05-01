import { LoyautCenter } from '../../layouts';
import { ErrorBlock } from '../../modules/error';

const erorrPage404 = new LoyautCenter({
  content: new ErrorBlock({ title: '404', text: 'Не туда попали' }),
});
const erorrPage5XX = new LoyautCenter({
  content: new ErrorBlock({ title: '500', text: 'Мы уже фиксим' }),
});

export { erorrPage404, erorrPage5XX };
