browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.action) {
    case 'TOGGLE_HIGHLIGHT':
      if (request.data.highlightStatus) {
        document.addEventListener('mouseup', highlightText);
        document.addEventListener('keyup', highlightText);
      } else {
        document.removeEventListener('mouseup', highlightText);
        document.removeEventListener('keyup', highlightText);
      }
      break;
    case 'SET_COLOR':
      color = request.data.color;
      break;
    case 'HIGHLIGHT':
      highlightText();
      break;
    case 'REMOVE_HIGHLIGHT':
      removeHighlight();
      break;
    default:
      sendResponse({ data: 'ERR' });
  }
});

let color = 'FAA99D';
const HIGHLIGHT_KEY = 'NPKryv4iXxihMRg2gxRkTfFhwXmNmX9F';

function getSelectedText() {
  var text = '';
  if (typeof window.getSelection != 'undefined') {
    text = window.getSelection().toString();
  } else if (
    typeof document.selection != 'undefined' &&
    document.selection.type === 'Text'
  ) {
    text = document.selection.createRange().text;
  }
  return text;
}

function highlightText() {
  var selectedText = getSelectedText();
  if (selectedText) {
    highlight();
  }
}

function highlight() {
  var mark = document.createElement('mark');
  mark.setAttribute('style', `background-color: #${color}`);
  mark.className = HIGHLIGHT_KEY;
  let sel = window.getSelection();
  if (sel.rangeCount) {
    var range = sel.getRangeAt(0).cloneRange();
    range.surroundContents(mark);
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

function removeHighlight() {
  var highlightedSelection = getHighlightedMark();

  if (highlightedSelection.className === HIGHLIGHT_KEY) {
    var parent = highlightedSelection.parentNode;
    var text = document.createTextNode(highlightedSelection.innerHTML);
  
    parent.insertBefore(text, highlightedSelection);
    highlightedSelection.remove();
  }
}

function getHighlightedMark() {
  var parent = null,
    sel;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      parent = sel.getRangeAt(0).commonAncestorContainer;
      if (parent.nodeType != 1) {
        parent = parent.parentNode;
      }
    }
  } else if ((sel = document.selection) && sel.type != 'Control') {
    parent = sel.createRange().parentElement();
  }
  return parent;
}
