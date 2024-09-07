export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'add' : IDL.Func([IDL.Float64, IDL.Float64], [IDL.Float64], []),
    'divide' : IDL.Func([IDL.Float64, IDL.Float64], [IDL.Opt(IDL.Float64)], []),
    'multiply' : IDL.Func([IDL.Float64, IDL.Float64], [IDL.Float64], []),
    'subtract' : IDL.Func([IDL.Float64, IDL.Float64], [IDL.Float64], []),
  });
};
export const init = ({ IDL }) => { return []; };
