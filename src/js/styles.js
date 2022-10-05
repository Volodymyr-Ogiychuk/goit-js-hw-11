import { refs } from './01-gallery'
export const styles = function () {

refs.header.style.width = '100%';
refs.header.style.position = 'fixed';
refs.header.style.height = '100px';
refs.header.style.backgroundColor = '#3a69b1';
refs.header.style.display = 'flex';
refs.header.style.justifyContent = 'center';
refs.header.style.alignItems = 'center';

refs.container.style.margin = 'auto'
refs.container.style.position = 'relative'

refs.input.style.borderRadius = '4px';

refs.btnSubmit.style.height = '28px';
refs.btnSubmit.style.width = '28px';

refs.btnSubmit.style.position = 'absolute';
refs.btnSubmit.style.right = '0';
}