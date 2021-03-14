import _ from 'lodash';
import '../style/style.scss';

function component() {
    const element = document.createElement('div');
  
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
  
    return element;
  }
function blueComponent(){
  const element = document.createElement('div');
  element.innerHTML = 'mon test à moi perso';
  element.classList.add('goodbye');
return element;
}  
  document.body.appendChild(component());
  document.body.appendChild(blueComponent());


let a;
console.log(a);