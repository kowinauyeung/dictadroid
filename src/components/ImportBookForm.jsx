import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup } from '../components/Modal';
import { Lang } from '../utils/Dictionary';
import './ImportBookForm.css';

const propTypes = {
  filename: PropTypes.string.isRequired,
  endAdd: PropTypes.func.isRequired,
  addBook: PropTypes.func.isRequired,
  addLesson: PropTypes.func.isRequired,
  addVocab: PropTypes.func.isRequired,
};

const defaultProps = {
  filename: '',
};

const booksPath = filename => (`/books/${filename}.json`);

class ImportBookForm extends Component {
  constructor() {
    super();
    this.isFetching = false;
    this.state = {
      data: null,
      isImporting: false,
    };
    this.loadingText = 'Downloading the book...';
    this.endImport = this.endImport.bind(this);
    this.startImport = this.startImport.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filename !== '') {
      this.getData(nextProps.filename);
    }
  }

  getData(filename) {
    if (this.isFetching) return;
    this.isFetching = true;
    const path = booksPath(filename);
    fetch(path, { method: 'get' })
      .then((r) => {
        r.json().then((data) => {
          this.isFetching = false;
          this.setState({ data });
        });
      });
  }

  importVocabs(data, bookId, lessonId, lessonIndex, callback) {
    const vocabs = data.lessons[lessonIndex].vocabs;
    let count = vocabs.length;
    vocabs.forEach((vocab) => {
      this.props.addVocab({ bookId, lessonId, ...vocab })
        .then(() => {
          count -= 1;
          if (count <= 0) {
            callback();
          }
        });
    });
  }

  importLesson(data, bookId, index, callback) {
    if (index >= data.lessons.length) {
      callback();
      return;
    }
    const lesson = data.lessons[index];
    const newData = { ...data };
    this.props.addLesson(bookId, lesson.title)
      .then((lessonId) => {
        this.importVocabs(data, bookId, lessonId, index, () => {
          newData.lessons[index].imported = true;
          this.setState({ data: newData });
          this.importLesson(data, bookId, (index + 1), callback);
        });
      });
  }

  startImport() {
    if (this.state.isImporting) return;
    const data = this.state.data;
    this.setState({ isImporting: true });
    this.props.addBook({
      title: data.title,
      lang: data.lang,
      transFrm: data.transFrm,
    }).then((bookId) => {
      this.importLesson(data, bookId, 0, () => {
        this.setState({
          isImporting: false,
          data: {
            ...this.state.data,
            imported: true,
          },
        });
      });
    });
  }

  endImport() {
    if (this.state.isImporting) return;
    this.setState({ data: null });
    this.props.endAdd();
  }

  renderFooter() {
    const { isImporting, data } = this.state;
    if (isImporting) {
      return <div className="text-center block">Importing...</div>;
    } else if (data.imported) {
      return (
        <a
          className="link text-center"
          role="presentation"
          onClick={this.endImport}
        >
          Done
        </a>
      );
    }
    return (
      <a
        className="link text-center"
        role="presentation"
        onClick={this.startImport}
      >
        Import
      </a>
    );
  }

  renderMain() {
    const { filename } = this.props;
    const { data } = this.state;
    return (
      <div>
        <div className="ks-card-header-pic">
          <div
            className="card-header color-white no-border"
            style={{
              backgroundImage: `url(/books/${filename}.jpg)`,
            }}
          />
          <div className="card-content">
            <div className="card-content-inner">
              <h2>{data.title}</h2>
              <p className="grey">
                Language: {Lang[data.lang]}, {data.lessons.length} lessons.
              </p>
            </div>
            <div className="list-block">
              <ul>
                {
                  data.lessons.map((lesson, key) => (
                    <li
                      key={(() => `lesson-${key}`)()}
                      className={lesson.imported ? 'imported' : ''}
                    >
                      <div className="item-content">
                        <div className="item-inner">
                          <div className="item-title">
                            {lesson.title}
                          </div>
                          <div className="item-after">
                            {`${lesson.vocabs.length} vocabs${lesson.imported ? ' imported' : ''}.`}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
          <div className="card-footer">{this.renderFooter()}</div>
        </div>
      </div>
    );
  }

  renderLoading() {
    return (<div className="downloading-book">{this.loadingText}</div>);
  }

  render() {
    const { filename } = this.props;
    const { data } = this.state;
    return (
      <Popup
        header="Import Book"
        visible={filename !== ''}
        isHideRight
        onLeftClick={this.endImport}
      >
        <div className="page-inner">
          {this.isFetching || !data ? this.renderLoading() : this.renderMain()}
        </div>
      </Popup>
    );
  }
}

ImportBookForm.propTypes = propTypes;
ImportBookForm.defaultProps = defaultProps;

export default ImportBookForm;
