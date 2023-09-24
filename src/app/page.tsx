import { IndexPage } from '@/app/public/IndexPage';
import { LayoutPattern } from './public/LayoutPattern';

export default function Index () {
  return (
    <LayoutPattern backgroundImage="africa" >
      <IndexPage />
    </LayoutPattern>
  );
}
