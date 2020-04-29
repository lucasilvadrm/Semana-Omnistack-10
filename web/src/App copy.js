import React, { useState } from 'react';
// import Header from './Header'

// componente - Bloco isolado de html, css e JS, o qual não interfere no restante da aplicação
// Propriedade - Informações que o componente PAI passa para o componente FILHO
// Estado - Informações mantidas pelo componente (Lembrar: imutabilidade)

function App() {
  const [counter, setCounter] = useState(0)

  function incrementador(evento) {
    setCounter(counter + 1)
  }

  return (
    <> {/* React.Fragment */}
      {/* <Header title="dashboard 1" />
      <Header title="dashboard 2" />
      <Header title="dashboard 3" /> */}
      <h1>Contador: {counter}</h1>
      <button onClick={incrementador}>Incrementar</button>
    </>

  );
}

export default App;
