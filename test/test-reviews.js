const chai = require('chai');
const chaiHttp = require('chai-http');
//const app = require('../app');
const should = chai.should();
//const Review = require('../models/review');

module.exports = function(app) {
chai.use(chaiHttp);

describe('Reviews', ()  => {

  // TEST INDEX
  it('should index ALL reviews on / GET', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });
  // test-reviews.js
    // TEST NEW
    it('should display new form on /reviews/new GET', (done) => {
      chai.request(server)
        .get(`/reviews/new`)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html
            done();
          });
    })
    // TEST SHOW
it('should show a SINGLE review on /reviews/<id> GET', (done) => {
  var review = new Review(sampleReview);
  review.save((err, data) => {
    chai.request(server)
      .get(`/reviews/${data._id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
  });
});
  // TEST NEW
  // TEST CREATE
  // TEST SHOW
  // TEST EDIT
  // TEST UPDATE
  // TEST DELETE
});

}
