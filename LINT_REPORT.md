# Relatório de Lint (Ultracite / Biome)

> Gerado a partir de `bun run check` (`ultracite check`).
> Total: **42 erros** em 24 arquivos.

## Como reproduzir

```bash
bun run check                       # checagem (lint + format)
bun x ultracite check --max-diagnostics=200   # ver todos os diagnósticos
bun run fix                         # aplica correções automáticas
```

## Resumo por regra

| Regra | Qtde | Auto-fix? |
| --- | :---: | :---: |
| `correctness/noUnusedFunctionParameters` | 11 | sim (unsafe) |
| `correctness/noUnusedVariables` | 5 | sim (unsafe) |
| `performance/noNamespaceImport` | 4 | manual |
| `style/useTemplate` | 3 | sim |
| `style/noNestedTernary` | 3 | manual |
| `style/useDefaultSwitchClause` | 2 | manual |
| `complexity/noUselessFragments` | 2 | sim |
| `suspicious/useAwait` | 1 | manual |
| `suspicious/noReactForwardRef` | 1 | manual |
| `style/useShorthandAssign` | 1 | sim |
| `style/useConsistentTypeDefinitions` | 1 | sim |
| `style/useConsistentMemberAccessibility` | 1 | manual |
| `style/noParameterProperties` | 1 | manual |
| `style/noNonNullAssertion` | 1 | manual |
| `performance/useTopLevelRegex` | 1 | manual |
| `performance/noBarrelFile` | 1 | manual |
| `correctness/noUnusedImports` | 1 | sim |
| `complexity/useLiteralKeys` | 1 | sim |
| `a11y/noLabelWithoutControl` | 1 | manual |

---

## 1. Código do projeto (`apps/` e `packages/`) — 17 erros

Estes são os que realmente importam para a aplicação.

### apps/native

| Arquivo:linha | Regra | O que é / como corrigir |
| --- | --- | --- |
| `app/(drawer)/index.tsx:123` | `style/noNestedTernary` | Ternário aninhado. Extraia para `if/else`, função auxiliar ou variável intermediária. |
| `app/_layout.tsx:39` | `complexity/noUselessFragments` | `<>...</>` desnecessário com um único filho. Remova o Fragment. |
| `components/header-button.tsx:8` | `suspicious/noReactForwardRef` | React 19+: use `ref` como prop normal em vez de `React.forwardRef`. |
| `components/sign-in.tsx:116` | `style/useTemplate` | Concatenação de string com `+`. Troque por template literal `` `...${x}` ``. |
| `components/sign-up.tsx:123` | `style/useTemplate` | Idem acima. |
| `lib/auth-client.ts:5` | `performance/noNamespaceImport` | `import * as X` impede tree-shaking. Importe só o que usa: `import { a, b } from ...`. |

### apps/web

| Arquivo:linha | Regra | O que é / como corrigir |
| --- | --- | --- |
| `src/app/dashboard/dashboard.tsx:8` | `correctness/noUnusedFunctionParameters` | Parâmetro não usado. Remova-o ou prefixe com `_`. |
| `src/app/dashboard/dashboard.tsx:15` | `complexity/noUselessFragments` | Fragment inútil. Remova. |
| `src/app/page.tsx:38` | `style/noNestedTernary` | Ternário aninhado. Refatore. |
| `src/app/todos/page.tsx:97` | `style/noNestedTernary` | Ternário aninhado. Refatore. |
| `src/components/mode-toggle.tsx:12` | `correctness/noUnusedImports` | Import não usado. Remova (auto-fix). |
| `src/components/mode-toggle.tsx:12` | `performance/noNamespaceImport` | `import * as`. Use import nomeado. |

### packages

| Arquivo:linha | Regra | O que é / como corrigir |
| --- | --- | --- |
| `api/src/context.ts:4` | `style/useConsistentTypeDefinitions` | Use `interface` no lugar de `type` (ou vice-versa, conforme preset). Auto-fix. |
| `auth/src/index.ts:3` | `performance/noNamespaceImport` | `import * as`. Use import nomeado. |
| `db/src/index.ts:5` | `performance/noNamespaceImport` | `import * as`. Use import nomeado. |
| `db/src/schema/index.ts:1` | `performance/noBarrelFile` | Barrel file (re-exporta tudo) prejudica tree-shaking. Importe direto dos módulos. |
| `ui/src/components/label.tsx:6` | `a11y/noLabelWithoutControl` | `<label>` sem controle associado. Associe via `htmlFor`/`id` ou aninhe o input. |

---

## 2. Exemplos de skills (`.agents/skills/`) — 25 erros

Estes arquivos são **exemplos de documentação** das skills (Elysia, Expo CI/CD), não código de produção. Recomendação: **excluí-los do lint** em `biome.json` em vez de "corrigi-los", pois servem como material didático.

<details>
<summary>Lista completa (25)</summary>

| Arquivo:linha | Regra |
| --- | --- |
| `elysiajs/examples/body-parser.ts:3` | `correctness/noUnusedVariables` |
| `elysiajs/examples/body-parser.ts:5` | `suspicious/useAwait` |
| `elysiajs/examples/body-parser.ts:6` | `style/useDefaultSwitchClause` |
| `elysiajs/examples/body-parser.ts:20` | `style/useShorthandAssign` |
| `elysiajs/examples/complex.ts:10` | `correctness/noUnusedVariables` |
| `elysiajs/examples/complex.ts:72` | `correctness/noUnusedFunctionParameters` |
| `elysiajs/examples/complex.ts:95` | `complexity/useLiteralKeys` |
| `elysiajs/examples/cookie.ts:3` | `correctness/noUnusedVariables` |
| `elysiajs/examples/error.ts:4` | `style/noParameterProperties` |
| `elysiajs/examples/error.ts:4` | `style/useConsistentMemberAccessibility` |
| `elysiajs/examples/error.ts:15` | `style/useDefaultSwitchClause` |
| `elysiajs/examples/guard.ts:20` | `correctness/noUnusedFunctionParameters` |
| `elysiajs/examples/guard.ts:22` | `correctness/noUnusedFunctionParameters` (×2) |
| `elysiajs/examples/schema.ts:3` | `correctness/noUnusedVariables` |
| `elysiajs/examples/schema.ts:18` | `correctness/noUnusedFunctionParameters` |
| `elysiajs/examples/schema.ts:28` | `correctness/noUnusedFunctionParameters` |
| `elysiajs/examples/schema.ts:51` | `correctness/noUnusedFunctionParameters` |
| `elysiajs/examples/schema.ts:52` | `correctness/noUnusedFunctionParameters` (×3) |
| `elysiajs/examples/upload-file.ts:3` | `correctness/noUnusedVariables` |
| `elysiajs/examples/websocket.ts:19` | `style/noNonNullAssertion` |
| `expo-cicd-workflows/scripts/fetch.js:14` | `style/useTemplate` |
| `expo-cicd-workflows/scripts/fetch.js:91` | `performance/useTopLevelRegex` |

</details>

Para ignorar no `biome.json`:

```jsonc
{
  "files": {
    "includes": ["**", "!.agents/**"]
  }
}
```

---

## Plano de correção sugerido

1. **Excluir `.agents/**` do lint** → elimina 25 erros (são exemplos de docs).
2. **`bun run fix`** → resolve automaticamente imports/template/fragments/etc.
3. **Manuais restantes** (código do projeto):
   - `noNamespaceImport` (auth, db, mode-toggle, auth-client) → trocar por imports nomeados.
   - `noNestedTernary` (3×) → refatorar para `if/else` ou helper.
   - `noReactForwardRef` (header-button) → `ref` como prop (React 19).
   - `noLabelWithoutControl` (label.tsx) → associar `<label>` ao input.
   - `noBarrelFile` (db/schema) → avaliar se o barrel é necessário.
