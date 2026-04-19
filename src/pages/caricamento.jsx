/**
 * 
 * @param {Object} props
 * @param {string} [props.color='border-green-600'] - Definisce il colore del caricamento.
 * - Formato: border-[colore].
 * - Default: border-green-600
 * @param {string} [props.size='h-30 w-30'] - Definisce la grandezza del caricamento.
 * - Formato: h-[altezza] w-[larghezza]
 * - Default: h-30 w-30
 * @returns 
 */

export default function Caricamento({ color = 'border-green-600', size = 'h-30 w-30' }) {

    return (
        <div className={`${size} animate-spin rounded-full ${color} border-8 border-t-transparent border-b-transparent`}></div>
    );
}