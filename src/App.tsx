import styles from './App.module.css'
import poweredImage from './assets/powered.png'
import {ChangeEvent, useState} from 'react'
import { levels,caculateImc, Level } from './helpers/imc';
import {GridItem} from './components/GridItem'
import laftArrowImage from './assets/leftarrow.png'

function App() {
  const [heightField, setHeightField] = useState<number>();
  const [weightField, setweightField] = useState<number>();
  const [toShow, setToShow] = useState <Level | null>(null);

  const handleCalculateButton=()=>{
    if (heightField && weightField){
      setToShow(caculateImc(heightField, weightField));

    }else{
      alert("Digite todos os Campos")
    }
  }
  const handleBackButton=()=>{
    setToShow(null);
    setHeightField(parseFloat(''));
    setweightField(parseFloat(''));
  }
  

  return (
    <div className={styles.main} >
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="Logo" width={150} />
          
        </div>
      </header>
        <div className={styles.container}>
          
          <div className={styles.leftSide}>
            <h1>Calcule Seu IMC.</h1>
            <p>
              IMC é a sigla para Índice de Massa Corpórea, parâmetro
               adotado pela Organização Mundial De Saúde para calcular 
               o peso ideal de cada Pessoa.
            </p>
            <input type="number" 
                   placeholder='Digite a sua altura. Ex: 1.5 (em Metros)' 
                   value={heightField}
                   onChange={(e)=>setHeightField(parseFloat(e.target.value))}
                   disabled={toShow?true:false}
                   />
                   
            
            <input type="number" 
                   placeholder='Digite a seu peso. Ex: 75.3 (em Kg)'
                   value={weightField}
                   onChange={(e)=>setweightField(parseFloat(e.target.value))}
                   disabled={toShow?true:false}
                   />

            <button onClick={handleCalculateButton} disabled={toShow?true:false}>Calcular</button>
          </div>
          <div className={styles.rightSide}>
            {!toShow &&
              <div className={styles.grid}>
                {levels.map((item, key)=>(
                <GridItem key={key} item={item} />
                ))}
              </div>
              }
              {toShow && 
                <div className={styles.rightBig}>
                  <div className={styles.rightArrow} onClick={handleBackButton}>
                    <img src={laftArrowImage} alt="" width={25} />
                  </div>
                  <GridItem  item={toShow} />
                </div>
              }
            </div>
          </div>
      </div>
  )
}

export default App
