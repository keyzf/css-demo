one = (v,e) => {
  e.preventDefault();
  console.log("click one ", v);
};

two = (v,e) => {
  e.preventDefault();
  e.stopPropagation();
  console.log("click two ", v);
};

three = (v,e)=> {
  e.preventDefault();
  e.stopPropagation();
  console.log("click three ", v);
};

four = (v,e) => {
  e.preventDefault();
  e.stopPropagation();
  console.log("click four ", v);
};
