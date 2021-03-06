package com.itechart.retailers.repository;

import com.itechart.retailers.model.entity.Customer;
import com.itechart.retailers.model.entity.Role;
import com.itechart.retailers.model.entity.User;
import com.itechart.retailers.model.entity.projection.UserView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> getByEmail(String email);

	Boolean existsByEmail(String email);

	List<User> findUsersByRole(Role role);

	List<User> findUsersByRoleAndCustomer(Role role, Customer customer);

	List<User> findUsersByCustomerId(Long id);

	Page<User> findUsersByCustomerId(Long id, Pageable pageable);

	List<UserView> findUserViewsByCustomerId(Long id);

	@Modifying
	@Query("update User u set u.isActive = :newStatus where u.id = :id")
	void changeUserStatus(@Param(value = "id") Long id, @Param(value = "newStatus") boolean newStatus);

	@Query("select u from User u where u.role = ?1 and u.customer.id = ?2")
	User getByRoleAndCustomerId(Role role, Long customerId);

	Optional<User> findByEmail(String email);

	@Query("select u from User u where u.customer.id = ?1 and u.isActive = ?2")
	List<User> findUsersByCustomerIdAndActive(Long customerId, boolean status);

	Optional<User> findUserByEmailAndCustomerId(String email, Long customerId);

	@Query("from User u " +
			"where day(u.birthday) = day(CURRENT_DATE) " +
			"and month(u.birthday) = month(CURRENT_DATE)")
	List<User> findUsersByBirthday();

}