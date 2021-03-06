import React from 'react';
import { createAction } from '@dx-groups/arthur';
import { message, Tooltip } from 'antd';
import moment from 'moment';
import { SHOW_LIST_SPIN } from 'Global/module';
import { isEmpty } from '@dx-groups/utils/lang';
import Ellipsis from 'Components/Ellipsis';

// ===========================> Reduck <=========================== //

function genListAction(arg, fetch, url, actionType) {
  return dispatch => {
    // const filter = objectHandler(arg, trim)
    const filter = arg;
    return fetch(dispatch, SHOW_LIST_SPIN)(url, filter).then(res => {
      if (res.code === 0) {
        dispatch(createAction(actionType)({ ...res.data, filter }));
      } else {
        message.error(res.errmsg);
      }
    });
  };
}

function genListState(key, filter) {
  return {
    [`${key}Filter`]: {
      pageSize: 10,
      currentPage: 1,
      ...filter,
    },
    [`${key}List`]: [],
    [`${key}Page`]: {},
  };
}

function resolveListState(key, state, payload) {
  const { filter, result, data, ...page } = payload;
  return {
    ...state,
    [`${key}Filter`]: filter,
    [`${key}List`]: result || data,
    [`${key}Page`]: page,
  };
}

const ReduckHelper = { genListAction, genListState, resolveListState };

// ===========================> Page <=========================== //

function genPlanColumn(key, title, extend) {
  return { ...extend, key, title, dataIndex: key };
}

function genLangColumn(key, title, extend, len = 20) {
  return {
    ...extend,
    key,
    title,
    dataIndex: key,
    render: text => {
      if (text.length <= len) {
        return <span>{text}</span>;
      }
      return (
        <Tooltip placement="top" title={text}>
          {`${text.substring(0, len)}...`}
        </Tooltip>
      );
    },
  };
}

function genEllipsisColumn(key, title, len = 12, extend) {
  return {
    ...extend,
    key,
    title,
    dataIndex: key,
    render: text => (
      <Ellipsis length={len} tooltip>
        {text}
      </Ellipsis>
    ),
  };
}

function genSelectColumn(key, title, options, extend) {
  return {
    ...extend,
    title,
    key,
    dataIndex: key,
    render: text => {
      const status = options.filter(option => `${option.value}` === `${text}`);
      return status.length > 0 ? status[0].name : text;
    },
  };
}

function unshiftIndexColumn(old, page, cProps = {}) {
  return [
    {
      key: 'index',
      title: '序号',
      ...cProps,
      render: (text, record, index) =>
        page ? page.pageSize * page.pageNo + (index + 1) - page.pageSize : index + 1,
    },
  ].concat(old);
}

function filterResolver(filter, key, sub1, sub2, format = 'YYYY-MM-DD') {
  const resItem = filter[key];
  delete filter[key];
  const finalFilter = Object.assign({}, filter, {
    [sub1]: (resItem && !isEmpty(resItem) && moment(resItem[0]).format(format)) || '',
    [sub2]: (resItem && !isEmpty(resItem) && moment(resItem[1]).format(format)) || '',
  });
  return finalFilter;
}

const DefaultPage = {
  pageNo: 1,
  records: 0,
  pageSize: 10,
};
function genPagination(page = DefaultPage, showSizeChanger = true) {
  return {
    current: parseInt(page.pageNo, DefaultPage.pageNo),
    total: parseInt(page.records, DefaultPage.records),
    pageSize: parseInt(page.pageSize, DefaultPage.pageSize),
    showSizeChanger,
    showQuickJumper: true,
    showTotal: () => `共 ${page.records} 项`,
    pageSizeOptions: ['5', '10', '20', '50'],
  };
}

// 数组转成以field为key的map对象
function arrayToMap(arr, key) {
  if (!arr) return {};

  return arr.reduce((map, item) => {
    map[item[key]] = item;
    return map;
  }, {});
}

export {
  ReduckHelper,
  genPlanColumn,
  genLangColumn,
  genSelectColumn,
  unshiftIndexColumn,
  filterResolver,
  genPagination,
  genEllipsisColumn,
  arrayToMap,
};
