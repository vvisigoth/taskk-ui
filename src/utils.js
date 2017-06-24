export const parseIssue = d => {
    let contents = d[1][0][1];
    //make this a function
    let title = /title: '(.*)'[\r\n]/.exec(contents);
    let author = /author: '(.*)'[\r\n]/.exec(contents);
    let assignee = /assignee: '(.*)'[\r\n]/.exec(contents);
    let cleaned = contents.replace(/\-\-\-[\s\S]*\-\-\-[\s\S]/,'');

    return {
      'issueId': d[0],
      'title': title[1],
      'author': author[1],
      'assignee': assignee[1],
      'description': cleaned.trim()
    };
};

export const defaultIssue = {
  title: "Sample Tile",
  description: "describe your issue here",
  author: "~zod",
  assignee: "~poldec"
};

export const massageBoard = d => { 
  let b = {};
  d.forEach(function(k, q) {
    b[k[0]] = k[1].map(d => {return parseIssue(d)});
  });
  return b;
};

