export const dataColumnSwap = () => {
  setTimeout(() => {
    const rows = document.querySelectorAll(`[role='row']`);
    const vari2 = document.querySelector(`[role='table']`);

    // const actionBTN1 = rows.childNodes[0]
    // const expandBTN1 = rows.childNodes[1]
    // console.log('actionBTN',rows,rows[0])

    // ignores header row
    for (var i = 0, max = rows.length; i < max; i++) {
      const row = rows[i];
      const actionBTN = row.childNodes[1];
      const expandBTN = row.childNodes[0];
      row.childNodes[1].parentNode.insertBefore(actionBTN, expandBTN);

      console.log(rows[i]);
    }
  });
};
