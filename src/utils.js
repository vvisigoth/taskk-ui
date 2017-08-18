export const parseIssue = d => {
    console.debug(d);
    let contents = d[1][0][1];
    //make this a function
    let title = /title: '(.*)'[\r\n]/.exec(contents);
    let author = /author: '(.*)'[\r\n]/.exec(contents);
    let assignee = /assignee: '(.*)'[\r\n]/.exec(contents);
    // this is gross, but I can't figure out a better way :/
    let cleaned = contents.replace(/\-\-\-[\s\S]*\-\-\-[\s\S]/,'');
    cleaned = cleaned.replace(/'/,'');
    cleaned = cleaned.replace(/'$/,'');

    return {
      'issueId': d[0],
      'title': title[1],
      'author': author[1],
      'assignee': assignee[1],
      'description': cleaned.trim()
    };
};

export const newId = txt => {
  let t = txt.split(' ');
  if (t.length < 4) {
    return t.join('-') + '-' + parseInt(Math.random() * 1000);
  } else {
    return t.slice(0,3).join('-') + '-' + parseInt(Math.random() * 1000);
  }
};

export const defaultIssue = {
  title: "Sample Tile",
  description: "describe your issue here",
  author: "~zod",
  assignee: "~poldec"
};

export const obj2Yaml = dObj => {
  return "---\r" +
  "author: '" + dObj['author'] + "'\r" +
  "assignee: '" + dObj['assignee'] + "'\r" +
  "title: '" + dObj['title'] + "'\r" +
  "---'\r" +  dObj['description']
};

export const massageBoard = d => { 
  let b = {};
  d.forEach(function(k, q) {
    if (k[1]) {
    console.debug(d);
    console.debug(k);
      b[k[0]] = k[1].map(d => {return parseIssue(d)});
    } else {
      b[k[0]] = [];
    }
  });
  colOrder.forEach(k => {
    if (!b[k]) {
      b[k] = [];
    }
  });
  return b;
};

export const colOrder = ['todo', 'doin', 'show', 'done'];

