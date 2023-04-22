import {useState} from 'react'
import './App.css'

function App() {
    let [mess, setMess] = useState('')
    let [key,setKey]=useState('')
    let[emess,setemes]=useState('')
    let alphabet ='абвгдежзийклмнопрстуфхцчшщъыьэюя'
   let [dmess,setDmess]=useState('')
    let [dkey,setDkey]=useState('')
    let[demess,setdemes]=useState('')
    function handleValue(val) {
        let re=/[а-яё]/i
        return re.test(val);
    }

    function generateSquare(alphabet) {
        let square=[]
        for (let i = 0; i < alphabet.length; i++) {
            let row = alphabet.slice(i);
            row += alphabet.slice(0, i);
            square.push(row);
        }
        return square
    }
    function  encrypt(mess,key) {

        let encryptMessage = "";
        let newKey=key.repeat(mess.length)
        let square=generateSquare(alphabet)

        for (let it = 0; it < mess.length; it++) {
            // Индекс строки равный символу сообщения
            let i = alphabet.indexOf(mess[it]);
            // Индекс колонки равный символу ключа
            let j = alphabet.indexOf(newKey[it]);
            // Зашифрованный символ равный пересечению индекса строки и колонки
            encryptMessage += square[i][j];
        }
        return encryptMessage;
    }
   function decrypt(mess, key) {
        let decryptMessage = "";
        let newKey=key.repeat(mess.length+1)
        let square=generateSquare(alphabet)
        for (let it = 0; it < mess.length; it++) {
            // Берем символ ключа и ищем индекс строки с данным символом
            let i = alphabet.indexOf(newKey[it]);
            let j = square[i].indexOf(mess[it]);
            decryptMessage += alphabet[j];
        }

        return decryptMessage;
    }
    return (
        <>
            <h1>ШИФР ВИЖИНЕРА</h1>
            <div>Данная программа позволит вам зашифровать и расшифровать сообщение.Поддерживаются только малые буквы русского алфавита    </div>
            <div className="container">
                <div className='card'>
                        <h2>шифрование текста</h2>
                    Текст:<input type={"text"} onChange={event => setMess(event.target.value)}/>
                    Ключ:<input type={"text"} onChange={event => setKey(event.target.value)}/>
                    <button onClick={()=>setemes(encrypt(mess,key))} disabled={mess.length===0 || key.length===0 ||  !/^[А-ЯЁ]+$/gi.test(mess) || !/^[А-ЯЁ]+$/gi.test(key)}>зашифровать</button>
                    {emess.length!==0 && <div>Результат:  <span style={{fontWeight:700}}>{emess}</span></div>}
                    { mess.length!==0 && key.length!==0 && (!/^[А-ЯЁ]+$/gi.test(mess) || !/^[А-ЯЁ]+$/gi.test(key)) && <div style={{color:'red'}}>вы ввели текст неправильно</div>}
                </div>
                <div className='card'>
                    <h2>дешифрование текста</h2>
                    Текст: <input type={"text"} onChange={event => setDmess(event.target.value)}/>
                    Ключ: <input type={"text"} onChange={event => setDkey(event.target.value)}/>
                    <button onClick={()=>setdemes(decrypt(dmess,dkey))} disabled={dmess.length===0 || dkey.length===0 || !/^[А-ЯЁ]+$/gi.test(dmess) || !/^[А-ЯЁ]+$/gi.test(dkey)}>расшифровать</button>
                    {demess.length!==0 && <div>Результат: <span style={{fontWeight:700}}>{demess}</span></div>}
                    { dmess.length!==0 && dkey.length!==0 && (!/^[А-ЯЁ]+$/gi.test(dmess) || !/^[А-ЯЁ]+$/gi.test(dkey)) && <div style={{color:'red'}}>вы ввели текст неправильно</div>}
                </div>

            </div>

        </>
    )
}

export default App
