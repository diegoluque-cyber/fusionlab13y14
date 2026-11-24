export default function PromoBanner({ promociones }) {
  if (promociones.length === 0) return null
  return (
    <section aria-label="Promociones" className="promos">
      {promociones.map((promo) => (
        <article key={promo.id} className="promo">
          <div className="promo-franja" aria-hidden="true" />
          <div className="promo-cuerpo">
            <p className="kicker">Promoción</p>
            <h3>{promo.titulo}</h3>
            {promo.descripcion && <p>{promo.descripcion}</p>}
            {promo.codigo && (
              <p className="cupon">
                Cupón {promo.codigo}
              </p>
            )}
          </div>
        </article>
      ))}
    </section>
  )
}
