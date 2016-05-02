/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import { expect } from 'chai';
import { describe, it } from 'mocha';
import { todoSchema } from './schema.js';
import { Source } from '../../language/source';
import { parse } from '../../language/parser';
import { validate } from '../../validation/validate';


/**
 * Helper function to test a query and the expected response.
 */
function validationErrors(query) {
  const source = new Source(query, 'ToDo.graphql');
  const ast = parse(source);
  return validate(StarWarsSchema, ast);
}

