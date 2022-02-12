browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'TOGGLE_HIGHLIGHT') {
    if (request.data.highlightStatus) {
      document.addEventListener('mouseup', highlightText);
      document.addEventListener('keyup', highlightText);
    } else {
      document.removeEventListener('mouseup', highlightText);
      document.removeEventListener('keyup', highlightText);
    }
  } else {
    sendResponse({ data: 'ERR' });
  }
});

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
  mark.setAttribute('style', 'background-color: #FAA99D');
  let sel = window.getSelection();
  if (sel.rangeCount) {
    var range = sel.getRangeAt(0).cloneRange();
    range.surroundContents(mark);
    sel.removeAllRanges();
    sel.addRange(range);
  }
}
