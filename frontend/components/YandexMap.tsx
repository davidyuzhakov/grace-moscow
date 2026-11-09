'use client'

import type { ReactifiedModule, reactify } from '@yandex/ymaps3-types/reactify'
import Script from 'next/script'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

type ReactifiedApi = ReturnType<ReturnType<typeof reactify.bindTo>['module']> &
  ReactifiedModule<typeof import('@yandex/ymaps3-default-ui-theme')>

const coordinates: [number, number] = [37.523453, 55.837437]
const location = { center: coordinates, zoom: 16 }
const apiKey = process.env.NEXT_PUBLIC_YANDEX_API_KEY

export function YandexMap() {
  const [scriptLoaded, setScriptLoaded] = React.useState(false)
  const [reactifiedApi, setReactifiedApi] =
    React.useState<ReactifiedApi | null>(null)
  const [failed, setFailed] = React.useState(false)

  React.useEffect(() => {
    if (!scriptLoaded || typeof ymaps3 === 'undefined') return

    let cancelled = false

    async function initialize() {
      await ymaps3.ready
      ymaps3.import.registerCdn(
        'https://cdn.jsdelivr.net/npm/{package}',
        '@yandex/ymaps3-default-ui-theme@0.0.25',
      )

      const [{ reactify }, defaultUi] = await Promise.all([
        ymaps3.import('@yandex/ymaps3-reactify'),
        ymaps3.import('@yandex/ymaps3-default-ui-theme'),
      ])

      if (cancelled) return

      const boundReactify = reactify.bindTo(React, ReactDOM)
      setReactifiedApi({
        ...boundReactify.module(ymaps3),
        ...boundReactify.module(defaultUi),
      })
    }

    initialize().catch((err) => {
      if (cancelled) return
      console.error('Ошибка инициализации Яндекс.Карт:', err)
      setFailed(true)
    })

    return () => {
      cancelled = true
    }
  }, [scriptLoaded])

  if (!apiKey || failed) {
    return (
      <div
        className="flex size-full items-center justify-center bg-surface text-muted p-6 text-center text-sm"
        role="status"
      >
        Не удалось загрузить карту. Воспользуйтесь кнопкой «Открыть в Картах».
      </div>
    )
  }

  return (
    <>
      <Script
        src={`https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`}
        onError={() => setFailed(true)}
        onReady={() => setScriptLoaded(true)}
      />
      {reactifiedApi ? (
        <MapContainer api={reactifiedApi} />
      ) : (
        <div
          className="size-full bg-surface-raised motion-safe:animate-pulse"
          role="status"
          aria-label="Загрузка карты"
        />
      )}
    </>
  )
}

function MapContainer({ api }: { api: ReactifiedApi }) {
  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapDefaultMarker,
    YMapControls,
    YMapZoomControl,
  } = api

  return (
    <YMap
      className="size-full rounded-2xl"
      location={location}
      theme="dark"
      behaviors={['drag', 'pinchZoom', 'dblClick']}
    >
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
      <YMapDefaultMarker
        coordinates={coordinates}
        title="Благодать"
        iconName="protestant_church"
        color="red"
        size="normal"
        staticHint
        onClick={() =>
          window.open(
            'https://yandex.ru/maps/org/blagodat/208449406853/',
            '_blank',
          )
        }
      />
      <YMapControls position="right">
        <YMapZoomControl />
      </YMapControls>
    </YMap>
  )
}
