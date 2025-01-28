/*--------------------------------------------------------------------------

@sinclair/typemap

The MIT License (MIT)

Copyright (c) 2024-2025 Haydn Paterson (sinclair) <haydn.developer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---------------------------------------------------------------------------*/

import { Validator } from './compile/validator'
import * as s from '@sinclair/typebox/syntax'
import * as t from '@sinclair/typebox'
import * as v from 'valibot'
import * as z from 'zod'

type BaseSchema = v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>

/** Statically infers a type */
// prettier-ignore
export type Static<Type extends object | string> = (
  Type extends string ? s.StaticParseAsType<{}, Type> :
  Type extends Validator<infer Type extends t.TSchema> ? t.Static<Type> :
  Type extends t.TSchema ? t.Static<Type> : 
  Type extends BaseSchema ? v.InferInput<Type> : 
  Type extends z.ZodTypeAny ? z.infer<Type> :
  never
)
